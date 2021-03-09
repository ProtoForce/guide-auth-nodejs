import { PromiseEx } from '../../types';
import { CodecDataTypes, Codec, JSONCodec } from '../../codec';
import { ClientTransportMeta } from '../transport';
import { HTTPTransportHeaders, HTTPMethod, ContentType } from '../http';
import { HttpRequestOptions, doXMLHTTPRequest, doFetchRequest } from './http';
import { DummyLogger, Logger } from '../../logger';

export interface HTTPClientRequest {
    method:     HTTPMethod;
    headers:    HTTPTransportHeaders;
    url:        string;
    payload?:   CodecDataTypes;
}

export interface HTTPClientResponse {
    status:     number;
    payload:    string;
    headers:    HTTPTransportHeaders;
}

export type HTTPRequestFunction<R extends HTTPClientResponse = HTTPClientResponse> =
    (req: HTTPClientRequest, options: HttpRequestOptions) => PromiseEx<R>;

/**
 * onHookBase provides a basis for all hooks
 * @service Service that is being called, read only
 * @method  Method of the service that is being called
 * @meta    Meta data which is provided by the client
 * @in      Data received as input from the client
 */
interface onClientHookBase<C, I, O, IS, OS, HI, HO> {
    service: string;
    method: string;
    meta: ClientTransportMeta<C, I, O, IS, OS, HI, HO>;
    in: I;
}

export type onClientSendHookData<C, I, O, IS, OS, HI, HO> = onClientHookBase<C, I, O, IS, OS, HI, HO>;

export type onClientRequestHookData<C, I, O, IS, OS, HI, HO> = onClientHookBase<C, I, O, IS, OS, HI, HO> & {
    request: HTTPClientRequest;
};

export type onClientResponseHookData<C, I, O, IS, OS, HI, HO> = onClientHookBase<C, I, O, IS, OS, HI, HO> & {
    response: HTTPClientResponse;
};

export type onClientResolveHookData<C, I, O, IS, OS, HI, HO> = onClientHookBase<C, I, O, IS, OS, HI, HO> & {
    out: O;
};

/** ClientHooks which can be used to monitor or adjust the content
 *  @onSend            When a send method is called
 *  @onRequest         Before the request is sent
 *  @onResponse        After response is received
 *  @onResolve         Before the control returns to the caller
 */
export interface ClientHooks {
    onSend?: <C, I, O, IS, OS, HI, HO>(data: onClientSendHookData<C, I, O, IS, OS, HI, HO>) => void | Promise<void>;
    onRequest?: <C, I, O, IS, OS, HI, HO>(data: onClientRequestHookData<C, I, O, IS, OS, HI, HO>) => void | Promise<void>;
    onResponse?: <C, I, O, IS, OS, HI, HO>(data: onClientResponseHookData<C, I, O, IS, OS, HI, HO>) => void | Promise<void>;
    onResolve?: <C, I, O, IS, OS, HI, HO>(data: onClientResolveHookData<C, I, O, IS, OS, HI, HO>) => void | Promise<void>;
}

export function sanitizeEndpoint(endpoint: string): string {
    if (!endpoint || endpoint.length === 0) {
        return endpoint;
    }

    if (endpoint.endsWith('/') || endpoint.endsWith('\\')) {
        endpoint = endpoint.substr(0, endpoint.length - 1);
    }

    return endpoint;
}

/** Options to configure behavior of the HTTP client transport
 *  @param {timeout}            Request timeout in milliseconds, default 60 seconds
 *  @param {logger}             Logger to be used during requests, default is a Dummy logger
 *  @param {headers}            Headers to be set on creation, can be later modified
 *  @param {defaultContentType} Codec to be used if no content-type is specified
 *  @param {codecs}             Map of codecs, default includes only application/json
 *  @param {hooks}              Array of hooks, default is empty
 */
interface HTTPClientTransportCommonOptions {
    timeout:            number;
    logger:             Logger;
    headers:            HTTPTransportHeaders;
    defaultContentType: string;
    codecs:             {[key: string]: Codec<CodecDataTypes>};
    hooks:              ClientHooks[];
    useServiceFQN:      boolean;
}

const defaultJsonCodec = new JSONCodec() as Codec<CodecDataTypes>;
const defaultHTTPClientTransportCommonOptions: HTTPClientTransportCommonOptions = {
    timeout:            60 * 1000,
    logger:             new DummyLogger(),
    headers:            {},
    defaultContentType: ContentType.ApplicationJson,
    codecs:             {
        [ContentType.ApplicationJson]: defaultJsonCodec,
        [ContentType.TextJson]: defaultJsonCodec
    },
    hooks:              [],
    useServiceFQN:      true
};

export type HTTPClientTransportOptions<R extends HTTPClientResponse = HTTPClientResponse> = HTTPClientTransportCommonOptions & {
    requestFunction:    HTTPRequestFunction<R>;
};

// This will help detecting if XMLHttpRequest is available
declare var XMLHttpRequest: any;
export const defaultHTTPClientTransportOptions: HTTPClientTransportOptions = {
    ...defaultHTTPClientTransportCommonOptions,
    useServiceFQN:      false,
    requestFunction:    typeof XMLHttpRequest !== 'undefined' ? doXMLHTTPRequest : doFetchRequest
};

export type HTTPWebsocketClientTransportOptions<ZC = void> = HTTPClientTransportCommonOptions & {
    protocols: string | string[];
    buzzerContext: ZC;
};

export const defaultHTTPWebsocketClientTransportOptions: HTTPWebsocketClientTransportOptions = {
    ...defaultHTTPClientTransportCommonOptions,
    protocols: [],
    buzzerContext: undefined
};

export function formatHTTPRequest(req: HTTPClientRequest): string {
    let res = `${HTTPMethod[req.method]} ${req.url}\nHeaders:\n${JSON.stringify(req.headers, undefined, 2)}`;
    if (req.payload) {
        res += `\n\nPayload:\n${JSON.stringify(req.payload)}`;
    }
    return res;
}

export function formatHTTPResponse(res: HTTPClientResponse): string {
    return `Code: ${res.status}\nHeaders:\n${JSON.stringify(res.headers, undefined, 2)}\nPayload:\n\n${res.payload}`;
}