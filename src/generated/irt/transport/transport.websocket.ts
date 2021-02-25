import { WithStaticDecoder } from '../codec';

export type MessageID = string;

// Success envelopes

export interface WebSocketMessage<T = unknown> {
    id: MessageID;
    headers: {[key: string]: string[]};
    body: T;
}

export interface WebSocketRequestMessage<T = unknown> extends WebSocketMessage<T> {
    methodId: {
        service: string;
        method: string;
    }
}

export interface WebSocketResponseMessage<T = unknown> extends WebSocketMessage<T> {
}

// Error envelopes

export interface RemoteErrorTransport {
    properties: {[key: string]: unknown};
}

export interface ShortException {
    kind: string;
    message: string;
}

export interface RemoteErrorCritical {
    messages: ShortException[];
}

export type RemoteError = { Transport: RemoteErrorTransport } | { Critical: RemoteErrorCritical };

export interface WebSocketError {
    id?: MessageID;
    headers: {[key: string]: string[]};
    error: RemoteError;
}

export function createTransportError(message: string, content?: unknown): RemoteError {
    return {
        Transport: {
            properties: {
                message,
                content
            }
        }
    };
}

export function createCriticalError(messages: ShortException | ShortException[]): RemoteError {
    return {
        Critical: {
            messages: Array.isArray(messages) ? messages : [messages],
        }
    };
}

export interface DeferredPromise<O = unknown, OS = unknown, H = unknown> {
    promise?: Promise<O>;
    resolve?: any;
    reject?: any;

    timeout: ReturnType<typeof setTimeout>;
    service: string;
    method: string;

    outClassRef?: WithStaticDecoder<O, OS, H>;
}