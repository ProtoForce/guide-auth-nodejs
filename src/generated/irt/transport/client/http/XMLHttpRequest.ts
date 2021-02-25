import { HTTPClientRequest, HTTPClientResponse } from '../common';
import { HttpRequestOptions, extractHeaders } from './common';
import { HTTPMethod, toHeadersMap } from '../../http';
import { PromiseEx } from '../../../types';

export function doXMLHTTPRequest(req: HTTPClientRequest, options: HttpRequestOptions): PromiseEx<HTTPClientResponse> {
    const { timeout, logger } = options;
    const r = new XMLHttpRequest();
    const promise: PromiseEx<HTTPClientResponse> = new Promise((resolve, reject) => {
        r.onreadystatechange = function() {
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
            if (r.readyState === 4) {
                const res: HTTPClientResponse = {
                    status: r.status,
                    payload: r.responseText,
                    headers: extractHeaders(r.getAllResponseHeaders())
                };
                resolve(res);
            }
        };

        r.open(req.method, req.url, true);
        const headers = toHeadersMap(req.headers, logger);
        Object.keys(headers).forEach(key => {
            r.setRequestHeader(key, headers[key]);
        });
        r.timeout = timeout;
        r.send(req.method === HTTPMethod.GET ? undefined : req.payload);
    });
    promise.cancel = r.abort;
    return promise;
}