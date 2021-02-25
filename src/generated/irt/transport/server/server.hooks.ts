import { CodecDataTypes } from '../../codec';
import { ConnectionContext } from './context';
import { RoutedService } from './router';

export interface onServerHookBase<C, T, OPTIONS> {
    options: OPTIONS;
    context: ConnectionContext<C, T>;
}

export type onServerRequestHookData<C, T, OPTIONS> = onServerHookBase<C, T, OPTIONS>;
export type onServerRequestErrorHookData<C, T, OPTIONS> = onServerHookBase<C, T, OPTIONS> & {
    err: any;
}

export type onServerRequestCompleteHookData<C, T, OPTIONS> = onServerHookBase<C, T, OPTIONS> & {
    requestData: string | undefined;
}

export type onServerBeforeDispatchHookData<C, I, O, IS, OS, T, OPTIONS> = onServerHookBase<C, T, OPTIONS> & {
    in: I;
    service: RoutedService<C, I, O, IS, OS>;
}

export type onServerAfterDispatchHookData<C, I, O, IS, OS, T, OPTIONS> = onServerHookBase<C, T, OPTIONS> & {
    in: I;
    out: O;
    service: RoutedService<C, I, O, IS, OS>;
}

export type onServerResponseHookData<C, I, O, IS, OS, T, OPTIONS> = onServerHookBase<C, T, OPTIONS> & {
    payload: CodecDataTypes;
    httpCode: number;
    service: RoutedService<C, I, O, IS, OS>;
}

export type onServerResponseErrorHookData<C, T, OPTIONS> = onServerHookBase<C, T, OPTIONS> & {
    err: any;
}

export type onServerExceptionHookData<C, T, OPTIONS> = onServerHookBase<C, T, OPTIONS> & {
    err: any;
}
export type onServerRouteExceptionHookData<C, I, O, IS, OS, T, OPTIONS> =
    onServerHookBase<C, T, OPTIONS> &
    onServerExceptionHookData<C, T, OPTIONS> & {
    service: RoutedService<C, I, O, IS, OS>;
}

/**
 * ServerHooksBase provides hooks for the Server. All are optional
 * @onRequest           Right after the request is received, before any processing
 * @onRequestError      Error during request processing
 * @onRequestComplete   Request receive finished, ready to decode and continue
 * @onBeforeDispatch    Decoding is finished, ready to dispatch
 * @onAfterDispatch     Server method is executed, ready to respond
 * @onResponse          Encoding is finished, ready to send to the client
 * @onResponseError     Error during response processing
 * @onException         Exception happened between onRequestComplete and onResponse
 */
export interface ServerHooksBase<C, T, OPTIONS> {
    onRequest?: (data: onServerRequestHookData<C, T, OPTIONS>) => boolean | Promise<boolean>;
    onRequestError?: (data: onServerRequestErrorHookData<C, T, OPTIONS>) => void | Promise<void>;
    onRequestComplete?: (data: onServerRequestCompleteHookData<C, T, OPTIONS>) => boolean | Promise<boolean>;
    onBeforeDispatch?: <I, O, IS, OS>(data: onServerBeforeDispatchHookData<C, I, O, IS, OS, T, OPTIONS>) => boolean | Promise<boolean>;
    onAfterDispatch?: <I, O, IS, OS>(data: onServerAfterDispatchHookData<C, I, O, IS, OS, T, OPTIONS>) => boolean | Promise<boolean>;
    onResponse?: <I, O, IS, OS>(data: onServerResponseHookData<C, I, O, IS, OS, T, OPTIONS>) => boolean | Promise<boolean>;
    onResponseError?: (data: onServerResponseErrorHookData<C, T, OPTIONS>) => void | Promise<void>;
    onException?: <I, O, IS, OS>(data: onServerRouteExceptionHookData<C, I, O, IS, OS, T, OPTIONS>) => boolean | Promise<boolean>;
}