
import { WSClient, WSClientState } from '../wsclient';
import { JSONCodec, Codec, CodecDataTypes, EncoderProxy } from '../../codec';
import { LogLevel } from '../../logger';
import {
    WebSocketRequestMessage,
    WebSocketResponseMessage,
    WebSocketError,
    RemoteErrorTransport,
    RemoteErrorCritical,
    createTransportError,
    createCriticalError,
    DeferredPromise
} from '../transport.websocket';
import { ClientSocketTransport, InData, OutData, ClientTransportMeta } from '../transport';
import { HTTPTransportHeaders, ContentType, getHTTPHeader, toHeadersMultimap } from '../http';
import {
    HTTPWebsocketClientTransportOptions,
    defaultHTTPWebsocketClientTransportOptions,
    sanitizeEndpoint
} from './common';
import {
    SocketClientCriticalError,
    SocketClientTransportError,
    ClientTransportError
} from './error';
import { mergeHeaders } from './http';
import { Random } from '../../random';
import { CodecError } from '../../types';
import { ServiceDispatcher } from '../dispatcher';
import { WithRTTI } from '../../rtti';

export class WebSocketClientTransport<C, ZC = unknown> implements ClientSocketTransport<C> {
    protected supported: boolean;
    // @ts-ignore TS will think wsc is not ready, but it will never be used if not supported
    protected wsc: WSClient;
    protected endpoint: string;
    protected options: HTTPWebsocketClientTransportOptions<ZC>;
    protected requests: {[key: string]: DeferredPromise};
    protected buzzers: {[key: string]: ServiceDispatcher<ZC>};

    public onStatusChanged?: (connected: boolean) => void;

    constructor(
        endpoint: string,
        options: Partial<HTTPWebsocketClientTransportOptions<ZC>> = {},
        buzzers: ServiceDispatcher<ZC>[] = []
    ) {
        this.endpoint = endpoint;
        this.requests = {};
        this.buzzers = {};
        this.options = {
            // @ts-ignore See if we can split this default into two sections, one being generic
            ...(defaultHTTPWebsocketClientTransportOptions as HTTPWebsocketClientTransportOptions<ZC>),
            ...options
        };

        this.supported = !!(WebSocket || (window && !!window['WebSocket']));
        if (!this.supported) {
            return;
        }

        buzzers.forEach(buz => {
            this.buzzers[buz.RTTI_CLASS] = buz;
        });

        this.wsc = new WSClient();
        this.wsc.open(endpoint, this.options.protocols);
        this.onMessage = this.onMessage.bind(this);
        this.onError = this.onError.bind(this);
        this.onConnect = this.onConnect.bind(this);
        this.onDisconnect = this.onDisconnect.bind(this);
        this.onConnecting = this.onConnecting.bind(this);
        this.wsc.onMessage = this.onMessage.bind(this);
        this.wsc.onError = this.onError.bind(this);
        this.wsc.onConnect = this.onConnect.bind(this);
        this.wsc.onDisconnect = this.onDisconnect.bind(this);
        this.wsc.onConnecting = this.onConnecting.bind(this);
    }

    public isReady(): boolean {
        if (!this.supported) {
            return false;
        }

        return this.wsc.state === WSClientState.Connected;
    }

    public getClient() {
        return this.wsc;
    }

    protected onConnect() {
        if (this.onStatusChanged) {
            this.onStatusChanged(true);
        }
    }

    protected onConnecting() {
        if (this.onStatusChanged) {
            this.onStatusChanged(false);
        }
    }

    protected onDisconnect() {
        if (this.onStatusChanged) {
            this.onStatusChanged(false);
        }
    }

    protected getCodec(contentType: string): Codec<CodecDataTypes> {
        const { codecs, logger } = this.options;
        const codec = codecs[contentType];
        if (!codec) {
            const msg = `Can't find codec for content type '${contentType}', available: ${Object.keys(codecs).join(', ')}`;
            logger.logf(LogLevel.Error, msg);
            throw new ClientTransportError(msg);
        }
        return codec;
    }

    public async send<I extends InData, O extends OutData, IS, OS, HI, HO>(
        service: WithRTTI,
        method: string,
        data: I,
        meta: ClientTransportMeta<C, I, O, IS, OS, HI, HO>
    ): Promise<O> {
        const { hooks, headers, timeout, defaultContentType, useServiceFQN } = this.options;
        const serviceID = useServiceFQN ? service.RTTI_FQN : service.RTTI_CLASS;

        const logger = this.options.logger.withContext(`${serviceID}.${method}`);
        logger.logf(LogLevel.Debug, `Sending request`);

        for (const hook of hooks) {
            const hookData = {
                service: serviceID,
                method,
                in: data,
                meta
            };
            if (hook.onSend) {
                await hook.onSend(hookData);
            }
        }

        // TODO Add other content types?
        // We only support defaultContentType at the moment
        const inContentType = defaultContentType;
        if (inContentType !== ContentType.ApplicationJson) {
            throw new ClientTransportError('Non JSON codec is not supported in WebSocket transport.');
        }
        const inCodec = this.getCodec(inContentType);
        const inPayload: EncoderProxy<CodecDataTypes> = inCodec.encode(
            data,
            meta.in,
            true
        ) as EncoderProxy<CodecDataTypes>;

        const message: WebSocketRequestMessage = {
            headers: toHeadersMultimap(mergeHeaders(headers, {[ContentType.Header]: inContentType})),
            id: Random.nextUUID(),
            methodId: {
                service: serviceID,
                method
            },
            body: inPayload.data
        };

        // TODO Add other content types?
        const serialized = JSON.stringify(message);
        const record: DeferredPromise<O, OS> = {
            service: serviceID,
            method,
            timeout: setTimeout(
                () => {
                    const error = 'timed out request to ' + serviceID + '/' + method;
                    record.reject(new Error(error));
                    delete this.requests[message.id];
                },
                timeout
            ),
            outClassRef: meta.out
        };
        record.promise = new Promise<O>((resolve, reject) => {
            record.reject = reject;
            record.resolve = resolve;
        });
        this.requests[message.id] = record as DeferredPromise<unknown, unknown>;
        logger.logf(LogLevel.Trace, serialized);
        this.wsc.send(serialized);
        return record.promise;
    }

    public setEndpoint(endpoint: string) {
        this.endpoint = sanitizeEndpoint(endpoint);
    }

    public getEndpoint(): string {
        return this.endpoint;
    }

    public setHeaders(headers: HTTPTransportHeaders | undefined) {
        this.options.headers = headers || {};
    }

    public getHeaders(): HTTPTransportHeaders {
        return this.options.headers || {};
    }

    public setTimeout(timeout: number) {
        this.options.timeout = timeout;
    }

    public getTimeout(): number {
        return this.options.timeout;
    }

    protected getAndCleanRecord(id: string) {
        const record = this.requests[id];
        delete this.requests[id];
        clearTimeout(record.timeout);
        return record;
    }

    protected onBuzzerMessage(msg: WebSocketRequestMessage) {
        const { logger, defaultContentType } = this.options;
        const handleException = (err: unknown) => {
            const envelope: WebSocketError = {
                id: msg.id,
                error: createCriticalError({kind: `Server`, message: `Exception: ${JSON.stringify(err)}`}),
                headers: {}
            };
            this.wsc.send(JSON.stringify(envelope));
        };
        try {
            const buzzer = this.buzzers[msg.methodId.service];
            if (!buzzer) {
                const envelope: WebSocketError = {
                    id: msg.id,
                    error: createTransportError(`Non registered buzzer`, msg.methodId),
                    headers: {}
                };
                logger.logf(LogLevel.Debug, `Unknown buzzer requested: ${msg.methodId}`);
                this.wsc.send(JSON.stringify(envelope));
                return;
            }

            const method = buzzer.methods[msg.methodId.method];
            if (!method) {
                const envelope: WebSocketError = {
                    id: msg.id,
                    error: createTransportError(`Unknown method ${msg.methodId.service}.${msg.methodId.method}`),
                    headers: {}
                };
                logger.logf(LogLevel.Debug, `Unknown buzzer method ${msg.methodId.service}.${msg.methodId.method}`);
                this.wsc.send(JSON.stringify(envelope));
                return;
            }

            const inContentType = getHTTPHeader(msg.headers, ContentType.Header) || defaultContentType;
            if (inContentType !== ContentType.ApplicationJson) {
                throw new ClientTransportError('Non JSON content type is not supported in WebSocket');
            }
            // TODO Not efficient, we should be able to just use proxy encoder here for JSON
            // for now
            const body = JSON.stringify(msg.body);
            const inCodec = this.getCodec(inContentType);
            const decoded = inCodec.decode(body, method.in, false);
            const outCodec = this.getCodec(ContentType.ApplicationJson);
            const respHeaders: {[key: string]: string} = {};

            buzzer.dispatch(this.options.buzzerContext, msg.methodId.method, decoded).then(
                (data: unknown) => {
                    const outPayload = outCodec.encode(data, method.out);
                    const envelope: WebSocketResponseMessage = {
                        id: msg.id,
                        headers: toHeadersMultimap(respHeaders),
                        // TODO Not optimal here, use proxy encoder to avoid double encoding
                        body: JSON.parse(outPayload as string),
                    }
                    const serialized = JSON.stringify(envelope);
                    this.wsc.send(serialized);
                },
                handleException
            ).catch(
                handleException
            )

        } catch (err) {
            logger.logf(LogLevel.Error, `Exception ${JSON.stringify(err)}`);
            handleException(err);
        }
    }

    protected onRpcResponseMessage(res: WebSocketResponseMessage) {
        const { logger, defaultContentType } = this.options;
        const record = this.getAndCleanRecord(res.id);

        try {
            const outContentType = getHTTPHeader(res.headers, ContentType.Header) || defaultContentType;
            if (outContentType !== ContentType.ApplicationJson) {
                throw new ClientTransportError('Non JSON content type is not supported in WebSocket');
            }
            // const outCodec = this.getCodec(outContentType);
            // TODO Add support for other codecs
            const payload = JSONCodec.decodeFinalizer(res.body, record.outClassRef)
            record.resolve(payload);

        } catch (err) {
            const msg = `Error '${err}' while processing response: ${JSON.stringify(res, undefined, 2)}`;
            logger.logf(LogLevel.Error, msg);
            record.reject(new CodecError(msg));
        }
    }

    protected onRpcErrorMessage(res: WebSocketError) {
        const { logger } = this.options;
        if (!res.id) {
            logger.logf(
                LogLevel.Error,
                `Server responded with an error: ${JSON.stringify(res, undefined, 2)}`
            );
            return;
        }

        const record = this.getAndCleanRecord(res.id);
        const error = res.error as { Transport: RemoteErrorTransport } & { Critical: RemoteErrorCritical };
        if (error.Transport) {
            record.reject(new SocketClientTransportError(error.Transport));
        } else
        if (error.Critical) {
            record.reject(new SocketClientCriticalError(error.Critical));
        } else {
            record.reject(new ClientTransportError(JSON.stringify(res, undefined, 2)));
        }
    }

    protected onError(event: Event) {
        this.options.logger.logf(
            LogLevel.Error,
            `Server was unable to process a request. Error: ${JSON.stringify(event, undefined, 2)}`
        );
    }

    protected onMessage(data: any) {
        const { logger } = this.options;

        const deserialized:
            WebSocketRequestMessage & WebSocketResponseMessage & WebSocketError = JSON.parse(data);
        logger.logf(LogLevel.Trace, '====================================================\nIncoming message:\n', data);
        // Check if this is an error message
        if (deserialized.error) {
            this.onRpcErrorMessage(deserialized);
        } else
        if (deserialized.methodId) {
            // Incoming buzzer
            this.onBuzzerMessage(deserialized);
        } else
        if (deserialized.body){
            // We only support regular RPC for now
            this.onRpcResponseMessage(deserialized);
        } else {
            const envelope: WebSocketError = {
                error: createTransportError(`Unsupported request`, data),
                headers: {}
            };
            this.wsc.send(JSON.stringify(envelope));
        }
    }
}