import { IRTError } from '../../types';
import { RemoteErrorTransport, RemoteErrorCritical } from '../transport.websocket';
import { HTTPClientRequest, HTTPClientResponse, formatHTTPRequest } from './common';
import { formatHTTPResponse } from '.';

export class ClientTransportError extends IRTError {
    constructor(message: string) {
        super(message);
    }
}

export class ClientTransportRequestError extends ClientTransportError {
    req: HTTPClientRequest;
    constructor(message: string, req: HTTPClientRequest) {
        super(message);
        this.req = req;
    }
}

export class ClientTransportResponseError extends ClientTransportError {
    req: HTTPClientRequest
    res: HTTPClientResponse;
    constructor(message: string, req: HTTPClientRequest, res: HTTPClientResponse) {
        super(message);
        this.req = req;
        this.res = res;
    }
}

export class SocketClientTransportError extends ClientTransportError {
    constructor(error: RemoteErrorTransport) {
        super(`Socket client transport error: ${JSON.stringify(error, undefined, 2)}`);
    }
}

export class SocketClientCriticalError extends ClientTransportError {
    constructor(error: RemoteErrorCritical) {
        super(`Socket client critical error: ${JSON.stringify(error, undefined, 2)}`);
    }
}

export type ClientTransportErrorType = ClientTransportError | ClientTransportRequestError | ClientTransportResponseError |
    SocketClientCriticalError | SocketClientTransportError;

export function formatClientError(error: ClientTransportErrorType, extended?: boolean): string {
    if (error instanceof ClientTransportRequestError) {
        if (extended) {
            let res = `${error.message}.\n${formatHTTPRequest(error.req)}`;
            if (error.stack) {
                res += `\n\nStack:\n${error.stack}`;
            }
            return res;
        } else {
            return error.message
        }
    }
    if (error instanceof ClientTransportResponseError) {
        if (extended) {
            let res = `${error.message}.\nRequest:\n${formatHTTPRequest(error.req)}\n\nResponse:\n${formatHTTPResponse(error.res)}`;
            if (error.stack) {
                res += `\n\nStack:\n${error.stack}`;
            }
            return res;
        } else {
            return error.message
        }
    }
    
    if (extended) {
        let res = error.message;
        if (error.stack) {
            res += `\n\nStack:\n${error.stack}`;
        }
        return res;
    }

    return error.message;
}