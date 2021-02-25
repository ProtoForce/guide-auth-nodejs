import { HTTPTransportHeaders } from '../../http';
import { Logger } from '../../../logger';

export function mergeHeaders(...headers: HTTPTransportHeaders[]): HTTPTransportHeaders {
    const res: HTTPTransportHeaders = {};
    headers.forEach(h => {
        // XMLHttpRequest does not support multiple headers, so we only
        // keep it for responses, for requests we just merge the latest in tothe list
        // of headers.
        Object.keys(h).forEach(k => {
            res[k.toLowerCase()] = h[k];
        });
    });
    return res;
}

export function extractHeaders(headers: string): HTTPTransportHeaders {
    const res: HTTPTransportHeaders = {};
    const arr = headers.trim().split(/[\r\n]+/);
    arr.forEach((line: string) => {
        const parts = line.split(': ');
        const header = parts.shift();
        if (!header) {
            return;
        }
        const value = parts.join(': ');
        const existingValue = res[header];
        if (typeof existingValue !== 'undefined') {
            res[header] = Array.isArray(existingValue) ?
                [...existingValue, value] :
                [existingValue, value];
        } else {
            res[header] = value;
        }
    });
    return res;
}

export interface HttpRequestOptions {
    timeout:            number;
    logger:             Logger;
}