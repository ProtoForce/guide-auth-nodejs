import { IMessage, request as wsRequest } from 'websocket';

import {
    ServerHooksBase,
    onServerHookBase,
    onServerExceptionHookData,
    WebSocketRequestMessage,
    WebSocketResponseMessage
} from '../../irt';
import { HTTPServerOptions } from './server.http';
import { WebSocketServerOptions } from './server.websocket';

/**
 * HTTPServerHooks provides hooks for the HTTPServer.
 */
export type HTTPServerHooks<C, T, OPTIONS = HTTPServerOptions<C, T>> = ServerHooksBase<C, T, OPTIONS>;

export type onServerConnectHookData<C, T, OPTIONS> = Omit<onServerHookBase<C, T, OPTIONS>, 'context'> & {
    request: wsRequest;
}
export type onServerConnectedHookData<C, T, OPTIONS> = onServerHookBase<C, T, OPTIONS>;
export type onServerMessageHookData<C, T, OPTIONS> = onServerHookBase<C, T, OPTIONS> & {
    message: IMessage;
}
export type onServerRequestMessageHookData<C, T, OPTIONS> = onServerHookBase<C, T, OPTIONS> & {
    message: WebSocketRequestMessage;
}
export type onServerResponseMessageHookData<C, T, OPTIONS> = onServerHookBase<C, T, OPTIONS> & {
    message: WebSocketResponseMessage;
}
export type onServerDisonnectedHookData<C, T, OPTIONS> = onServerHookBase<C, T, OPTIONS>;

/**
 * ServerHooks provides hooks for the HTTPServer. All are optional
 * @onConnect           When a new client connects, can be rejected there
 * @onConnected         Once connection is established
 * @onDisconnected      Once connection is lost
 */
export interface SocketServerHooksBase<C, T, OPTIONS> {
    onConnect?: (data: onServerConnectHookData<C, T, OPTIONS>) => boolean | Promise<boolean>;
    onConnected?: (data: onServerConnectedHookData<C, T, OPTIONS>) => void | Promise<void>;
    onMessage?: (data: onServerMessageHookData<C, T, OPTIONS>) => boolean | Promise<boolean>;
    onRequestMessage?: (data: onServerRequestMessageHookData<C, T, OPTIONS>) => boolean | Promise<boolean>;
    onResponseMessage?: (data: onServerResponseMessageHookData<C, T, OPTIONS>) => boolean | Promise<boolean>;
    onException?: (data: onServerExceptionHookData<C, T, OPTIONS>) => boolean | Promise<boolean>;
    onDisconnected?: (data: onServerDisonnectedHookData<C, T, OPTIONS>) => void | Promise<void>;
}

export type WebSocketServerHooks<C, T, OPTIONS = WebSocketServerOptions<C>> = SocketServerHooksBase<C, T, OPTIONS>;