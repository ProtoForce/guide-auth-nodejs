import { Logger, LogLevel } from '../logger';

/**
 * HTTP methods
 */
export enum HTTPMethod {
    GET     = "GET",
    POST    = "POST",
    PUT     = "PUT",
    DELETE  = "DELETE",
    PATCH   = "PATCH",

    OPTIONS = "OPTIONS",

    // Not needed, only for reference here
    HEAD    = "HEAD",
    CONNECT = "CONNECT",
    TRACE   = "TRACE"
}

export type HTTPTransportHeaders = {[key: string]: undefined | string | string[]};

export function getHTTPHeader(headers: HTTPTransportHeaders, header: string): string | undefined {
    const value = headers[header.toLowerCase()];
    if (!value || (Array.isArray(value) && value.length === 0)) {
        return undefined;
    }

    return Array.isArray(value) ? value[0] : value;
}

export function toHeadersMultimap(headers?: HTTPTransportHeaders): {[key: string]: string[]} {
    const res: {[key: string]: string[]} = {};
    if (headers) {
        Object.keys(headers).forEach(key => {
            const value = headers[key];
            if (typeof value === 'undefined') {
                return;
            }
            if (Array.isArray(value)) {
                res[key] = value;
            } else {
                res[key] = [value];
            }
        });
    }
    return res;
}

export function toHeadersMap(headers: HTTPTransportHeaders, logger: Logger): {[key: string]: string} {
    const res: {[key: string]: string} = {};
    Object.keys(headers).forEach(key => {
        const content = headers[key];
        if (typeof content === 'undefined') {
            return;
        }
        if (Array.isArray(content)) {
            if (content.length === 0) {
                // Empty array, nothing to do
                return;
            }
            if (content.length > 1) {
                logger.logf(
                    LogLevel.Warning,
                    `Header ${key} is defined multiple times, only last one will be set.`
                );
            }
            res[key] = content[content.length - 1];
        } else {
            res[key] = content;
        }
    });
    return res;
}


export function isContentType(type: string, types: string | string[]): boolean {
    if (!Array.isArray(types)) {
        return type === types;
    }

    for (let i = 0; i < types.length; i++) {
        if (types[i] === type) {
            return true;
        }
    }

    return false;
}


export enum ContentType {
    Header = 'Content-Type',
    ApplicationJson = 'application/json',
    TextJson = 'text/json'
}

export enum CORSHeaders {
    AllowOrigin = 'Access-Control-Allow-Origin',
    AllowMethods = 'Access-Control-Allow-Methods',
    MaxAge = 'Access-Control-Max-Age',
    AllowHeaders = 'Access-Control-Allow-Headers',
    ExposeHeaders = 'Access-Control-Expose-Headers'
}

export interface HTTPSpec {
    code?: number;
}

export enum XHeaders {
    ResponseType = 'X-Response-Type',
    Success = 'X-Success',
    Failure = 'X-Failure'
}

export enum XResponseType {
    Success = 'Success',
    Failure = 'Failure'
}

export enum XSuccessHeader {
    Left = 'Left',                      // 400
    Right = 'Right',                    // 200
    Scalar = 'Scalar'                   // 200
}

export enum XFailureHeader {
    BadInput = 'Bad-Input',             // 500
    ServerFailure = 'Server-Failure'    // 501
}