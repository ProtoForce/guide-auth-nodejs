import { HTTPClientRequest, HTTPClientResponse } from '../common';
import { HttpRequestOptions } from './common';
import { HTTPMethod, toHeadersMap } from '../../http';
import { PromiseEx } from '../../../types';

export function doFetchRequest(req: HTTPClientRequest, options: HttpRequestOptions): PromiseEx<HTTPClientResponse> {
    const { timeout, logger } = options;
    const controller = new AbortController();
    const promise: PromiseEx<HTTPClientResponse> = new Promise(async (resolve, reject) => {
        const timeoutHandler = setTimeout(() => {
            controller.abort();
            reject(new Error(`Request timed out`));
        }, timeout);
        try {
            const signal = controller.signal;
            const response = await fetch(req.url, {
                method: req.method,
                mode: 'cors',       // no-cors, *cors, same-origin
                cache: 'no-cache',  // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: toHeadersMap(req.headers, logger),
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // no-referrer, *client
                body: req.method === HTTPMethod.GET ? undefined : req.payload,
                signal
            });

            const text = await response.text();
            clearTimeout(timeoutHandler);
            const headers: {[key: string]: string} = {};
            response.headers.forEach((v, k) => headers[k] = v);
            const res: HTTPClientResponse = {
                status: response.status,
                payload: text,
                headers
            };
            resolve(res);
        } catch (err) {
            clearTimeout(timeoutHandler);
            reject(err);
        }
    });
    promise.cancel = controller.abort;
    return promise;
}