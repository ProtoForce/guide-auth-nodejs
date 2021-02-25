import * as http from 'http';
import { server as wsServer, request as wsRequest, connection as wsConnection, IMessage, IServerConfig } from 'websocket';

import {
    ContentType,
    HTTPTransportHeaders,
    getHTTPHeader,
    toHeadersMultimap,
    toHeadersMap,
    ConnectionContext,
    ServiceDispatcher,
    Logger,
    LogLevel,
    DummyLogger,
    Codec,
    AuthNone,
    CodecDataTypes,
    JSONCodec,
    SystemContext,
    RemoteError,
    MessageID,
    WebSocketError,
    WebSocketRequestMessage,
    WebSocketResponseMessage,
    createTransportError,
    createCriticalError,
    DeferredPromise,
    Random,
    WithRTTI,
    ClientTransport,
    ClientTransportMeta,
    InData,
    OutData,
    ServiceDispatcherAware
} from '../../irt';
import { WebSocketServerHooks } from './server.hooks';

/** Options to configure behavior of the HTTP server
 *  @port               Port to listen on, default 8080
 *  @logger             Logger to be used during requests, default is a Dummy logger
 *  @headers            Headers to be set on creation, can be later modified
 *  @defaultContentType Codec to be used if no content-type is specified
 *  @codecs             Map of codecs, default includes only application/json
 *  @hooks              Array of hooks, default includes a single RestSpec hook
 *  @cors               CORS options
 */
export interface WebSocketServerOptions<C> {
    logger:             Logger;
    headers:            HTTPTransportHeaders;
    defaultContentType: string;
    codecs:             {[key: string]: Codec<CodecDataTypes>};
    hooks:              Array<WebSocketServerHooks<C, WebSocketServerTransportContext>>;
    allowOrigin:        string;
    websocket?:         IServerConfig;
    buzzerTimeout:      number; // in milliseconds
}

const defaultJsonCodec = new JSONCodec() as Codec<CodecDataTypes>;
export const defaultWebsocketServerOptions: WebSocketServerOptions<unknown> = {
    logger:             new DummyLogger(),
    headers:            {},
    defaultContentType: ContentType.ApplicationJson,
    codecs:             {
        [ContentType.ApplicationJson]: defaultJsonCodec,
        [ContentType.TextJson]: defaultJsonCodec
    },
    hooks:              [],
    allowOrigin:        '*',
    websocket: undefined,
    buzzerTimeout:      10000
}

export interface WebSocketServerTransportContext extends ClientTransport<{}> {
    connection: wsConnection;
    messageHeaders: {[key: string]: string};
}

export class WebSocketServerGeneric<C, ZC = unknown> {
    protected server: wsServer;
    protected services: ServiceDispatcher<ConnectionContext<C, WebSocketServerTransportContext>>[];
    protected servicesMap: {[key: string]: ServiceDispatcher<ConnectionContext<C, WebSocketServerTransportContext>>};
    protected options: WebSocketServerOptions<C>;
    protected connections: ConnectionContext<C, WebSocketServerTransportContext>[];
    protected requests: {[key: string]: DeferredPromise};

    constructor(
        server: http.Server,
        services: (ServiceDispatcher<ConnectionContext<C, WebSocketServerTransportContext>> | ServiceDispatcherAware<ConnectionContext<C, WebSocketServerTransportContext>>)[],
        options: Partial<WebSocketServerOptions<C>> = {},
    ) {
        this.services = services.map(s => {
            const maybeAware = s as Partial<ServiceDispatcherAware<ConnectionContext<C, WebSocketServerTransportContext>>>;
            if (typeof maybeAware.$dispatcher === 'function') {
                return maybeAware.$dispatcher();
            }
            return s as ServiceDispatcher<ConnectionContext<C, WebSocketServerTransportContext>>;
        });

        this.options = {
            ...(defaultWebsocketServerOptions as WebSocketServerOptions<C>),
            ...options
        };
        this.connections = [];
        this.servicesMap = {};
        this.server = new wsServer({
            ...(this.options.websocket || {}),
            // WebSocket server is tied to a HTTP server. WebSocket
            // request is just an enhanced HTTP request. For more info
            // http://tools.ietf.org/html/rfc6455#page-6
            httpServer: server
        });
        this.requests = {};
        this.init();
    }

    protected sendError(
        context: ConnectionContext<C, WebSocketServerTransportContext>,
        error: RemoteError,
        errorFor?: MessageID,
        headers?: {[key: string]: string | string[]}
    ) {
        const envelope: WebSocketError = {
            id: errorFor,
            headers: toHeadersMultimap(headers),
            error
        };
        const json = JSON.stringify(envelope);
        context.system.transport.connection.send(json);
    }

    protected isOriginAllowed(origin: string) {
        if (this.options.allowOrigin === '*') {
            return true;
        }
        return this.options.allowOrigin === origin;
    }

    protected buzzerSendClosure<C>(conn: wsConnection) {
        return <I extends InData, O extends OutData, IS, OS, HI, HO> (
            service: WithRTTI,
            method: string,
            data: I,
            meta: ClientTransportMeta<C, I, O, IS, OS, HI, HO>
        ): Promise<O> => {
            const inCodec = this.options.codecs[ContentType.ApplicationJson];
            const payload = inCodec.encode(data, meta.in, false);
            // TODO Add support for other codecs and use a proxy so that we don't
            // do double encoding for JSON
            const body = JSON.parse(payload as string);
            const envelope: WebSocketRequestMessage = {
                id: Random.nextUUID(),
                methodId: {
                    service: service.RTTI_FQN,
                    method
                },
                body,
                // Should we add content type here?
                headers: {}
            };
            const serialized = JSON.stringify(envelope);
            const record: DeferredPromise<O, OS> = {
                service: service.RTTI_FQN,
                method,
                timeout: setTimeout(
                    () => {
                        const error = 'timed out request to ' + service + '/' + method;
                        record.reject(new Error(error));
                        delete this.requests[envelope.id];
                    },
                    this.options.buzzerTimeout
                ),
                outClassRef: meta.out
            };
            record.promise = new Promise<O>((resolve, reject) => {
                record.reject = reject;
                record.resolve = resolve;
            });
            this.requests[envelope.id] = record as DeferredPromise<unknown, unknown>;
            conn.send(serialized);
            return record.promise;
        };
    }

    protected printServices() {
        const logger = this.options.logger.withContext(`WebSocketServer`);
        logger.logf(LogLevel.Debug, `WebSocket Services Map`);
        Object.keys(this.servicesMap).sort().forEach(svc => {
            const service = this.servicesMap[svc];
            logger.logf(LogLevel.Info, `${svc} ${service.RTTI_CLASS}`);
        });
    }

    protected init() {
        const { logger, hooks, codecs, defaultContentType } = this.options;
        this.services.forEach(svc => {
            this.servicesMap[svc.RTTI_FQN] = svc;
            if (!(svc.RTTI_CLASS in this.servicesMap)) {
                this.servicesMap[svc.RTTI_CLASS] = svc;
            }
        });
        this.printServices();

        this.server.on('request', async (request: wsRequest) => {
            logger.logf(LogLevel.Trace, 'Incoming connection from ' + request.origin);

            const context = new ConnectionContext<C, WebSocketServerTransportContext>();
            context.system = new SystemContext();

            for (const hook of hooks) {
                if (!hook.onConnect) {
                    continue;
                }

                const hookData = {
                    context,
                    options: this.options,
                    request
                };
                const hookResult = await hook.onConnect(hookData);
                if (!hookResult) {
                    request.reject();
                    logger.logf(LogLevel.Trace, `Connection from ${request.origin} was rejected.`);
                    return;
                }
            }

            if (!this.isOriginAllowed(request.origin)) {
                request.reject();
                logger.logf(LogLevel.Debug, `Connection from not allowed origin ${request.origin} is rejected.`);
                return;
            }

            var connection = request.accept(undefined, request.origin);
            context.system.transport = {
                connection,
                messageHeaders: {},
                send: this.buzzerSendClosure(connection)
            };

            for (const hook of hooks) {
                if (!hook.onConnected) {
                    continue;
                }

                const hookData = {
                    context,
                    options: this.options
                };
                await hook.onConnected(hookData);
            }

            this.connections.push(context);

            connection.on('message', async (message: IMessage) => {
                for (const hook of hooks) {
                    if (!hook.onMessage) {
                        continue;
                    }

                    const hookData = {
                        context,
                        options: this.options,
                        message
                    };
                    const hookResult = await hook.onMessage(hookData);
                    if (!hookResult) {
                        return;
                    }
                }

                if (message.type !== 'utf8' || !message.utf8Data) {
                    logger.logf(LogLevel.Warning, 'Non textual format is not supported. ', message);
                    return;
                }

                const data = message.utf8Data;
                // Websocket messages are currently only JSON type
                const envelope: WebSocketRequestMessage = JSON.parse(data);
                if (typeof envelope !== 'object') {
                    this.sendError(
                        context,
                        createTransportError(`Unexpected socket envelope: ${JSON.stringify(data)}`));
                    return;
                }

                for (const hook of hooks) {
                    if (!hook.onRequestMessage) {
                        continue;
                    }

                    const hookData = {
                        context,
                        options: this.options,
                        message: envelope
                    };
                    const hookResult = await hook.onRequestMessage(hookData);
                    if (!hookResult) {
                        return;
                    }
                }

                // See if this is a buzzer response
                // TODO Unify this with transport websocket client,
                // so that we can have single logic for messages processing
                // For now - implemented but very shallowly
                if (this.requests[envelope.id]) {
                    const buzzerResponse: WebSocketResponseMessage & WebSocketError = envelope as any;
                    const record = this.requests[envelope.id];
                    delete this.requests[envelope.id];
                    clearTimeout(record.timeout);
                    if (buzzerResponse.error) {
                        record.reject(buzzerResponse.error);
                    } else {
                        const respBody = JSONCodec.decodeFinalizer(envelope.body, record.outClassRef);
                        record.resolve(respBody);
                    }
                    return;
                }

                // Before we proceed, let's update our headers for this message
                if (envelope.headers) {
                    const headersMap = toHeadersMap(envelope.headers, logger);
                    if (headersMap.authorization) {
                        context.system.auth.updateFromValue(headersMap.authorization);
                    } else {
                        context.system.auth.method = new AuthNone();
                    }
                    context.system.transport.messageHeaders = headersMap;
                }

                // Check incoming content type
                const inContentType = getHTTPHeader(envelope.headers, 'content-type') || ContentType.ApplicationJson;
                const inCodec = codecs[inContentType];
                if (!inCodec) {
                    this.sendError(
                        context,
                        createTransportError(`Unsupported codec for content type ${inContentType}`),
                        envelope.id);
                    return;
                }

                let respHeaders: {[key: string]: string} = {};
                // For now only default one is supported
                // we should pull this out of the Out models
                const outContentType = defaultContentType;
                // Let's ignore for websocket for now
                // respHeaders[ContentType.Header] = outContentType;
                const outCodec = codecs[outContentType];

                const service = this.servicesMap[envelope.methodId.service];
                if (!service) {
                    this.sendError(
                        context,
                        createTransportError(`Unknown service ${envelope.methodId.service}`),
                        envelope.id);
                    return;
                }
                const method = service.methods[envelope.methodId.method];
                if (!method) {
                    this.sendError(
                        context,
                        createTransportError(`Unknown ${envelope.methodId.service}.${envelope.methodId.method} method`),
                        envelope.id);
                    return;
                }

                const handleException = async (err: any) => {
                    logger.logf(LogLevel.Error, 'Dispatching failed:\n', err);

                    for (const hook of hooks) {
                        if (!hook.onException) {
                            continue;
                        }

                        const hookData = {
                            context,
                            options: this.options,
                            err
                        };
                        const hookResult = await hook.onException(hookData);
                        if (!hookResult) {
                            return;
                        }
                    }

                    this.sendError(
                        context,
                        createCriticalError({kind: 'DispatchError', message: `${err}`}),
                        envelope.id
                    );
                };

                try {
                    // TODO We need to use a proxy decoder, so that we can go straight to
                    // the type we need, in case it is a JSON, in other cases has to be handled
                    // differently.
                    const payloadString = JSON.stringify(envelope.body);
                    const inPayload = inCodec.decode(payloadString, method.in);

                    service.dispatch(
                        context,
                        envelope.methodId.method,
                        inPayload
                    ).then(
                        async (res: unknown) => {
                            const outPayload = outCodec.encode(res, method.out, false);
                            const outEnvelope: WebSocketResponseMessage = {
                                id: envelope.id,
                                headers: toHeadersMultimap(respHeaders),
                                // TODO Redo this, not efficient. We should use a proxy and not do
                                // double decoding.
                                body: JSON.parse(outPayload as string)
                            }

                            for (const hook of hooks) {
                                if (!hook.onResponseMessage) {
                                    continue;
                                }

                                const hookData = {
                                    context,
                                    options: this.options,
                                    message: outEnvelope
                                };
                                const hookResult = await hook.onResponseMessage(hookData);
                                if (!hookResult) {
                                    return;
                                }
                            }

                            connection.send(JSON.stringify(outEnvelope));
                        },
                        handleException
                    ).catch(
                        handleException
                    );
                } catch (err) {
                    await handleException(err);
                }
            });

            connection.on('error', (err: Error) => {
                // hooks.onError
                this.options.logger.logf(LogLevel.Warning, 'Error received: ', err);
            });

            connection.on('close', async (code: number, desc: string) => {
                for (const hook of hooks) {
                    if (!hook.onDisconnected) {
                        continue;
                    }

                    const hookData = {
                        context,
                        options: this.options
                    };
                    await hook.onDisconnected(hookData);
                }
                this.connections = this.connections.filter(c => c !== context);
            });
        });
    }

    public getServer() {
        return this.server;
    }

    public closeAllConnections() {
        this.server.closeAllConnections();
    }

    public shutdown() {
        this.server.shutDown();
    }
}