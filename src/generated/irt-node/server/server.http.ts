import * as http from 'http';
import {
    ServiceDispatcher,
    SystemContext,
    Logger,
    LogLevel,
    DummyLogger,
    HTTPTransportHeaders,
    ContentType,
    CORSHeaders,
    HTTPMethod,
    getHTTPHeader,
    unrestify,
    XHeaders,
    XResponseType,
    XSuccessHeader,
    XFailureHeader,
    isContentType,
    RoutingMap,
    buildServerRoutes,
    compileServerRoutesList,
    findServerRoute,
    ConnectionContext,
    CodecDataTypes,
    Codec,
    JSONCodec,
    DecoderProxy,
    EncoderProxy,
    HTTPServerCORSOptions,
    defaultHTTPServerCorsOptions,
    ServiceDispatcherAware
} from '../../irt';

import { HTTPServerHooks } from './server.hooks';
import {isObject} from "../../irt/transport/rest/common";

export interface HTTPServerTransportContext {
    request: http.IncomingMessage;
    response: http.ServerResponse;
}

export interface HTTPServerRequest {
    method: HTTPMethod;
    path: string;
    headers: HTTPTransportHeaders;
    body?: string;
}

export interface HTTPServerResponse {
    headOnly?: boolean;
    headers?: HTTPTransportHeaders;
    statusCode: number;
    body?: CodecDataTypes;
}

/** Options to configure behavior of the HTTP server
 *  @port               Port to listen on, default 8080
 *  @logger             Logger to be used during requests, default is a Dummy logger
 *  @headers            Headers to be set on creation, can be later modified
 *  @defaultContentType Codec to be used if no content-type is specified
 *  @codecs             Map of codecs, default includes only application/json
 *  @hooks              Array of hooks, default includes a single RestSpec hook
 *  @cors               CORS options
 */
export interface HTTPServerOptions<C, T> {
    port:               number; // default 8080
    logger:             Logger;
    headers:            HTTPTransportHeaders;
    defaultContentType: string;
    codecs:             {[key: string]: Codec<CodecDataTypes>};
    hooks:              Array<HTTPServerHooks<C, T>>;
    cors:               HTTPServerCORSOptions;
}

const defaultJsonCodec = new JSONCodec() as Codec<CodecDataTypes>;
export const defaultHTTPServerOptions: HTTPServerOptions<unknown, unknown> = {
    port:               8080,
    logger:             new DummyLogger(),
    headers:            {},
    defaultContentType: ContentType.ApplicationJson,
    codecs:             {
        [ContentType.ApplicationJson]: defaultJsonCodec,
        [ContentType.TextJson]: defaultJsonCodec
    },
    hooks:              [],
    cors:               defaultHTTPServerCorsOptions
}

export abstract class HttpServerGeneric<C, T> {
    protected endpoint: string;
    protected services: ServiceDispatcher<ConnectionContext<C, T>>[];
    protected options: HTTPServerOptions<C, T>;
    protected routes: RoutingMap<C, T>;

    constructor(
        endpoint: string,
        services: (ServiceDispatcher<ConnectionContext<C, T>> | ServiceDispatcherAware<ConnectionContext<C, T>>)[],
        options: Partial<HTTPServerOptions<C, T>> = {}
    ) {
        this.endpoint = endpoint.endsWith('/') ? endpoint : endpoint + '/';
        this.options = {
            ...defaultHTTPServerOptions,
            ...options,
            hooks: options.hooks || [],
            cors: {
                ...defaultHTTPServerOptions.cors,
                ...options.cors
            }
        };
        this.services = services.map(s => {
            const maybeAware = s as Partial<ServiceDispatcherAware<ConnectionContext<C, T>>>;
            if (typeof maybeAware.$dispatcher === 'function') {
                return maybeAware.$dispatcher();
            }
            return s as ServiceDispatcher<ConnectionContext<C, T>>;
        });
        this.routes = buildServerRoutes(this.services);
    }

    protected abstract handleResponse(context: ConnectionContext<C, T>, request: HTTPServerRequest, response: HTTPServerResponse): void | Promise<void>;
    protected abstract handleRequestBody(context: ConnectionContext<C, T>, request: HTTPServerRequest): string | undefined | Promise<string | undefined>;

    protected async handleOptions(context: ConnectionContext<C, T>, request: HTTPServerRequest) {
        const headers = this.corsHeaders();
        await this.handleResponse(context, request, {
            headOnly: true,
            statusCode: 200,
            headers,
        });
    }

    protected corsHeaders() {
        const { cors } = this.options;
        const headers: {[key: string]: string} = {};
        // IE8 does not allow domains to be specified, just the *
        // headers["Access-Control-Allow-Origin"] = req.headers.origin;
        headers[CORSHeaders.AllowOrigin] = cors.allowOrigin;

        headers[CORSHeaders.AllowMethods] = cors.allowMethods.join(', ');
        headers[CORSHeaders.MaxAge] = cors.maxAge;
        headers[CORSHeaders.AllowHeaders] = cors.allowHeaders.join(', ');
        headers[CORSHeaders.ExposeHeaders] = cors.exposeHeaders.join(', ');
        return headers;
    }

    protected async handleInvalidEndpoint(context: ConnectionContext<C, T>, request: HTTPServerRequest) {
        const { logger } = this.options;

        const msg = 'Invalid endpoint: ' + request.path + '. Expected to use ' + this.endpoint;
        logger.logf(LogLevel.Error, msg);
        await this.handleResponse(context, request, {
            statusCode: 500,
            body: msg,
            headers: {
                [XHeaders.ResponseType]: XResponseType.Failure,
                [XHeaders.Failure]: XFailureHeader.BadInput
            }
        });
    }

    protected async handleInvalidRoute(context: ConnectionContext<C, T>, request: HTTPServerRequest) {
        const { logger } = this.options;

        const msg = `Invalid route: ${request.method} ${request.path}`;
        logger.logf(LogLevel.Error, msg);
        await this.handleResponse(context, request, {
            statusCode: 500,
            body: msg,
            headers: {
                [XHeaders.ResponseType]: XResponseType.Failure,
                [XHeaders.Failure]: XFailureHeader.BadInput
            }
        });
    }

    protected async handleInvalidContentType(context: ConnectionContext<C, T>, request: HTTPServerRequest, contentType: string) {
        const { logger } = this.options;

        const msg = `Unsupported content type: ${contentType} at ${request.path}`;
        logger.logf(LogLevel.Error, msg);
        await this.handleResponse(context, request, {
            statusCode: 500,
            body: msg,
            headers: {
                [XHeaders.ResponseType]: XResponseType.Failure,
                [XHeaders.Failure]: XFailureHeader.BadInput
            }
        });
    }

    protected async processRequest(context: ConnectionContext<C, T>, request: HTTPServerRequest) {
        const { method, path: url = '', headers } = request;
        const { hooks, codecs, logger, defaultContentType } = this.options;

        for (const hook of hooks) {
            if (!hook.onRequest) {
                continue;
            }

            const hookData = {
                context,
                options: this.options
            };
            const hookResult = await hook.onRequest(hookData);
            if (!hookResult) {
                return;
            }
        }

        // Check CORS request
        if (method === HTTPMethod.OPTIONS) {
            await this.handleOptions(context, request);
            return;
        }

        // Check endpoint correctness
        const endpointPos = url.indexOf(this.endpoint);
        if (endpointPos < 0) {
            await this.handleInvalidEndpoint(context, request);
            return;
        }

        const urlPath = url.substr(endpointPos + this.endpoint.length);

        const respHeaders = this.corsHeaders();

        // Check route and find the proper dispatcher
        const routeChunk = findServerRoute(this.routes, urlPath, request.method);
        if (!routeChunk || !routeChunk.service) {
            this.handleInvalidRoute(context, request);
            return;
        }
        const service = routeChunk.service[request.method];
        if (!service || !service.service) {
            this.handleInvalidRoute(context, request);
            return;
        }

        // Check incoming content type
        const inContentType = getHTTPHeader(headers, 'content-type') || ContentType.ApplicationJson;
        const inCodec = codecs[inContentType];
        if (!inCodec) {
            this.handleInvalidContentType(context, request, inContentType);
            return;
        }

        // For now only default one is supported
        // we should pull this out of the Out models
        const outContentType = defaultContentType;
        respHeaders[ContentType.Header] = outContentType;
        const outCodec = codecs[outContentType];


        let body: string | undefined;
        try {
            body = await this.handleRequestBody(context, request);
        } catch (err) {
            logger.logf(LogLevel.Error, `Error while serving request:\nURL: ${url}\nError: ${JSON.stringify(err, undefined, 2)}`);
            for (const hook of hooks) {
                if (!hook.onRequestError) {
                    continue;
                }

                const hookData = {
                    err,
                    context,
                    options: this.options
                };
                await hook.onRequestError(hookData);
            }
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
                    err,
                    service
                };
                const hookResult = await hook.onException(hookData);
                if (!hookResult) {
                    return;
                }
            }

            await this.handleResponse(context, request, {
                statusCode: 501,
                body: '' + err,
                headers: {
                    [XHeaders.ResponseType]: XResponseType.Failure,
                    [XHeaders.Failure]: XFailureHeader.ServerFailure
                }
            });
        };

        try {
            for (const hook of hooks) {
                if (!hook.onRequestComplete) {
                    continue;
                }

                const hookData = {
                    context,
                    options: this.options,
                    requestData: body
                };
                const hookResult = await hook.onRequestComplete(hookData);
                if (!hookResult) {
                    return;
                }
            }

            const restSpec = service.meta.in && service.meta.in.restSpec;
            // If we unrestify data and it was a GET request without a body,
            // we need to provide a blank structure so codecs can start working
            // on it. For REST based decoders, we can also safely assume
            // it'll be JSON codec, so it is fine to provide an empty string.
            const finalBody = restSpec ? body || '{}' : body;
            const inMaybeProxy = finalBody ?
                inCodec.decode(
                    finalBody,
                    service.meta.in,
                    !!restSpec
                ) :
                finalBody;

            // Apply rest if available
            if (restSpec && inMaybeProxy instanceof DecoderProxy) {
                unrestify(urlPath, inMaybeProxy.data, restSpec);
            }

            const inPayload = inMaybeProxy instanceof DecoderProxy ?
                inMaybeProxy.finalize(inMaybeProxy.data) :
                inMaybeProxy;

            for (const hook of hooks) {
                if (!hook.onBeforeDispatch) {
                    continue;
                }

                const hookData = {
                    context,
                    options: this.options,
                    in: inPayload,
                    service
                };
                const hookResult = await hook.onBeforeDispatch(hookData);
                if (!hookResult) {
                    return;
                }
            }

            service.service.dispatch(
                context,
                service.method,
                inPayload
            ).then(
                async (res: unknown) => {
                    for (const hook of hooks) {
                        if (!hook.onAfterDispatch) {
                            continue;
                        }

                        const hookData = {
                            context,
                            options: this.options,
                            in: inPayload,
                            out: res,
                            service
                        };
                        const hookResult = await hook.onAfterDispatch(hookData);
                        if (!hookResult) {
                            return;
                        }
                    }

                    let httpCode = 200;
                    if (service.meta.out && service.meta.out.httpSpec) {
                        const httpSpec = service.meta.out.httpSpec(res);
                        if (typeof httpSpec.code !== 'undefined') {
                            httpCode = httpSpec.code;
                        }
                    }

                    const outMaybeProxy = outCodec.encode(res, service.meta.out, service.meta.alternative);
                    respHeaders[XHeaders.ResponseType] = XResponseType.Success;
                    if (service.meta.alternative) {
                        // We need to check headers for alternatives, in case
                        // we need to convert the payload back to left / right type of answer
                        if (isContentType(
                            outContentType,
                            [ContentType.ApplicationJson, ContentType.TextJson]
                            ) && outMaybeProxy instanceof EncoderProxy) {
                                const eitherKeys = isObject(outMaybeProxy.data)  ?
                                        Object.keys(outMaybeProxy.data).filter(k => typeof (outMaybeProxy.data as {[key: string]: unknown})[k] !== 'undefined') :
                                        [];

                            if (eitherKeys.length === 1) {
                                const eitherKey = eitherKeys[0];
                                outMaybeProxy.data = (outMaybeProxy.data as {[key: string]: unknown})[eitherKey];
                                if (eitherKey === 'right') {
                                    respHeaders[XHeaders.Success] = XSuccessHeader.Right;
                                } else {
                                    respHeaders[XHeaders.Success] = XSuccessHeader.Left;
                                    httpCode = 400;
                                }
                            } else {
                                logger.logf(LogLevel.Warning, `Expected left / right keys for alternative either payload. Got: ${eitherKeys.join(',')}`);
                            }
                        } else {
                            logger.logf(LogLevel.Warning, `No support for alternative encoding for codec ${outContentType}`);
                        }
                    } else {
                        respHeaders[XHeaders.Success] = XSuccessHeader.Scalar;
                    }

                    const outPayload = outMaybeProxy instanceof EncoderProxy ?
                        outMaybeProxy.finalize(outMaybeProxy.data) :
                        outMaybeProxy;

                    for (const hook of hooks) {
                        if (!hook.onResponse) {
                            continue;
                        }

                        const hookData = {
                            context,
                            options: this.options,
                            payload: outPayload,
                            service,
                            httpCode
                        };
                        const hookResult = await hook.onResponse(hookData);
                        if (!hookResult) {
                            return;
                        }
                    }

                    await this.handleResponse(context, request, {
                        statusCode: httpCode,
                        headers: respHeaders,
                        body: outPayload,
                    });
                },
                handleException
            ).catch(
                handleException
            );
        } catch (err) {
            await handleException(err);
        }
    }
}

export type HttpServerContext<C> = ConnectionContext<C, HTTPServerTransportContext>;

export class HttpServer<C = void> extends HttpServerGeneric<C, HTTPServerTransportContext> {
    private readonly server: http.Server;

    constructor(endpoint: string,
                services: (ServiceDispatcher<HttpServerContext<C>> | ServiceDispatcherAware<HttpServerContext<C>>)[],
                options: Partial<HTTPServerOptions<C, HTTPServerTransportContext>> = {},
                open: boolean = true) {
        super(endpoint, services, options);

        this.serverRequestHandler = this.serverRequestHandler.bind(this);
        this.server = http.createServer(this.serverRequestHandler);
        if (open) {
            this.open();
        }
    }

    public getServer() {
        return this.server;
    }

    public open() {
        if (this.server.listening) {
            return;
        }

        const { port } = this.options;
        const logger = this.options.logger.withContext(`HTTPServer`);

        this.server.listen(port, (/*err: string*/) => {
            // if (err) {
            //     logger.logf(LogLevel.Error, 'Failed to start the server: ' + err);
            //     return;
            // }
            logger.logf(LogLevel.Info, `Listening on port ${port} at ${this.endpoint}`);
            logger.logf(LogLevel.Debug, 'Options\n' + JSON.stringify(this.options, undefined, 2));
            logger.logf(LogLevel.Debug, 'Collected routes:');
            compileServerRoutesList(this.services).forEach(r => logger.logf(LogLevel.Debug, r));
        });
    }

    protected async serverRequestHandler(request: http.IncomingMessage, response: http.ServerResponse) {
        const { logger, hooks } = this.options;
        const context = new ConnectionContext<C, HTTPServerTransportContext>({
            request,
            response
        });
        if (request.headers.authorization) {
            context.system.auth.updateFromValue(request.headers.authorization);
        }

        const handleError = async (err: Error) => {
            logger.logf(LogLevel.Error, 'Error while serving response: ', err);
            for (const hook of hooks) {
                if (!hook.onResponseError) {
                    continue;
                }

                const hookData = {
                    err,
                    context,
                    options: this.options
                };
                await hook.onResponseError(hookData);
            }
        }

        if (!request.url || !request.method) {
            const err = new Error(`Incoming request with no URL (${request.url}) or method (${request.method})`);
            handleError(err);
            response.statusCode = 500;
            response.write(`Unexpected error: ${handleError}`);
            response.end();
            return;
        }

        const r: HTTPServerRequest = {
            method: request.method!.toUpperCase() as HTTPMethod,
            path: request.url,
            headers: request.headers,
        };

        // TODO Add typing here for err
        response.on('error', handleError);

        await this.processRequest(context, r);
    }

    protected handleRequestBody(context: ConnectionContext<C, HTTPServerTransportContext>, request: HTTPServerRequest): string | undefined | Promise<string | undefined> {
        // const logger = this.options.logger;
        // const hooks = this.options.hooks;
        return new Promise((resolve, reject) => {
            let body: any[] = [];
            context.system.transport.request
                // TODO Provide a type for err here
                .on('error', async (err: any) => {
                    reject(err);
                })
                .on('data', (chunk: any) => {
                    body.push(chunk);
                })
                .on('end', async () => {
                    const data: string | undefined = request.method !== HTTPMethod.GET ? Buffer.concat(body).toString() : undefined;
                    resolve(data);
                });
        });
    }

    protected handleResponse(context: ConnectionContext<C, HTTPServerTransportContext>, request: HTTPServerRequest, response: HTTPServerResponse): void | Promise<void> {
        return new Promise((resolve) => {
            const res = context.system.transport.response;
            if (response.headers && Object.keys(response.headers).length > 0) {
                res.writeHead(response.statusCode, response.headers);
            } else {
                res.statusCode = response.statusCode;
            }

            if (response.body) {
                res.write(response.body);
            }
            res.end();
            resolve();
        });
    }
}