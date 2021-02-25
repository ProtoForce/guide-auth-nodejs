
import { ClientTransport, InData, ClientTransportMeta, OutData } from '../transport';
import { LogLevel } from '../../logger';
import { Codec, CodecDataTypes, EncoderProxy, DecoderProxy } from '../../codec';
import {
    ContentType,
    HTTPTransportHeaders,
    HTTPMethod,
    getHTTPHeader,
    XHeaders,
    XResponseType,
    XSuccessHeader,
    isContentType
} from '../http';
import { restify } from '../rest';
import {
    HTTPClientRequest,
    HTTPClientResponse,
    sanitizeEndpoint,
    HTTPClientTransportOptions,
    defaultHTTPClientTransportOptions
} from './common';
import {
    ClientTransportError,
    ClientTransportRequestError,
    ClientTransportResponseError
} from './error';
import { mergeHeaders } from './http';
import { WithRTTI } from '../../rtti';
import { PromiseEx } from '../../types';

export class HTTPClientTransport<C = void, R extends HTTPClientResponse = HTTPClientResponse> implements ClientTransport<C> {
    private endpoint: string;
    private options: HTTPClientTransportOptions<R>;

    /** Create a new instance of HTTPClientTransport
     *  @param {endpoint}           The endpoint that will be used for all requests
     *  @param {options}            All options are optional, can override default behavior
     */
    constructor(endpoint: string, options: Partial<HTTPClientTransportOptions<R>> = {}) {
        this.setEndpoint(endpoint);
        this.options = {
            ...defaultHTTPClientTransportOptions as HTTPClientTransportOptions<R>,
            ...options
        };
    }

    private getCodec(contentType: string): Codec<CodecDataTypes> {
        const { codecs, logger } = this.options;
        const codec = codecs[contentType];
        if (!codec) {
            const msg = `Can't find codec for content type '${contentType}', available: ${Object.keys(codecs).join(', ')}`;
            logger.logf(LogLevel.Error, msg);
            throw new ClientTransportError(msg);
        }
        return codec;
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

    public send<I extends InData, O extends OutData, IS, OS, HI, HO>(
        service: WithRTTI,
        method: string,
        data: I,
        meta: ClientTransportMeta<C, I, O, IS, OS, HI, HO>
    ): PromiseEx<O> {
        const { hooks, headers, defaultContentType, requestFunction, useServiceFQN } = this.options;
        const serviceID = useServiceFQN ? service.RTTI_FQN : service.RTTI_CLASS;
        return new Promise(async (resolve, reject) => {
            const logger = this.options.logger.withContext(`${serviceID}.${method}`);

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

            // We only support defaultContentType at the moment
            const inContentType = defaultContentType;
            const inCodec = this.getCodec(inContentType);
            let path = `/${serviceID}/${method}`;
            let httpMethod: HTTPMethod = HTTPMethod.POST;
            const restSpec = meta.in && meta.in.restSpec;
            const inMaybeProxy = inCodec.encode(
                data,
                meta.in,
                !!restSpec
            );
            if (restSpec && inMaybeProxy instanceof EncoderProxy) {
                if (typeof inMaybeProxy.data !== 'object') {
                    throw new ClientTransportError(`REST spec expects an object from the encoder proxy. ${serviceID}.${method}`);
                }
                // @ts-ignore
                path = restify(inMaybeProxy.data, restSpec);
                if (!path.startsWith('/')) {
                  path = '/' + path
                }
                httpMethod = restSpec.method;
            }

            const url = `${this.endpoint}${path}`;

            const payload = inMaybeProxy instanceof EncoderProxy ?
                inMaybeProxy.finalize(inMaybeProxy.data) :
                inMaybeProxy;

            const req: HTTPClientRequest = {
                method: httpMethod,
                headers: mergeHeaders(headers, {[ContentType.Header]: inContentType}),
                url,
                payload
            };

            for (const hook of hooks) {
                const hookData = {
                    service: serviceID,
                    method,
                    in: data,
                    meta,
                    request: req
                };
                if (hook.onRequest) {
                    await hook.onRequest(hookData);
                }
            }

            logger.logf(LogLevel.Debug, `Request: \n${JSON.stringify(req, undefined, 2)}`);

            requestFunction(req, this.options).then(
                async (res: HTTPClientResponse) => {
                    logger.logf(LogLevel.Debug, `Response: \n${JSON.stringify(res, undefined, 2)}`);

                    for (const hook of hooks) {
                        const hookData = {
                            service: serviceID,
                            method,
                            in: data,
                            meta,
                            response: res
                        };
                        if (hook.onResponse) {
                            await hook.onResponse(hookData);
                        }
                    }

                    try {
                        const outContentType = getHTTPHeader(res.headers, ContentType.Header) || defaultContentType;
                        const outCodec = this.getCodec(outContentType);

                        const outMaybeProxy = outCodec.decode(res.payload, meta.out, meta.alternative);

                        if (meta.alternative) {
                            // We need to check headers for alternatives, in case
                            // we need to convert the payload back to left / right type of answer

                            if (isContentType(
                                outContentType,
                                [ContentType.ApplicationJson, ContentType.TextJson]
                            ) && outMaybeProxy instanceof DecoderProxy) {
                                const responseType = getHTTPHeader(res.headers, XHeaders.ResponseType);
                                switch (responseType) {
                                    case XResponseType.Success: {
                                        const successType = getHTTPHeader(res.headers, XHeaders.Success);
                                        if (typeof successType !== 'undefined') {
                                            if (successType === XSuccessHeader.Left) {
                                                outMaybeProxy.data = {left: outMaybeProxy.data} as unknown as OS;
                                            } else
                                            if (successType === XSuccessHeader.Right) {
                                                outMaybeProxy.data = {right: outMaybeProxy.data} as unknown as OS;
                                            } else {
                                                reject(new ClientTransportResponseError(`Unexpected success type ${successType} for alternative response.`, req, res));
                                                return;
                                            }
                                        } else {
                                            reject(new ClientTransportResponseError(`No success ${XSuccessHeader} header is found.`, req, res));
                                            return;
                                        }
                                    } break;

                                    case XResponseType.Failure: {
                                        const failureType = getHTTPHeader(res.headers, XHeaders.Failure);
                                        reject(new ClientTransportResponseError(`Failure ${failureType}.`, req, res));
                                        return;
                                    }

                                    default:
                                        reject(new ClientTransportResponseError(`No alternative response information provided.`, req, res));
                                        return;
                                }
                            } else {
                                logger.logf(LogLevel.Warning, `No support for alternative encoding for codec ${outContentType}`);
                            }
                        }

                        const outPayload = outMaybeProxy instanceof DecoderProxy ?
                            outMaybeProxy.finalize(outMaybeProxy.data) :
                            outMaybeProxy;

                        for (const hook of hooks) {
                            const hookData = {
                                service: serviceID,
                                method,
                                in: data,
                                out: outPayload,
                                meta
                            };
                            if (hook.onResolve) {
                                await hook.onResolve(hookData);
                            }
                        }

                        resolve(outPayload);
                    } catch (err) {
                        reject(new ClientTransportResponseError(`Error '${err}' while processing response`, req, res));
                    }
                },
                (err) => {
                    reject(new ClientTransportRequestError(`Error '${err}' while processing request`, req));
                }
            );
        });
    }
}