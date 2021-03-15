import * as https from 'https';
import * as http from 'http';

import {
    PromiseEx,
    toHeadersMap,
    HTTPClientResponse,
    HTTPClientRequest,
    HttpRequestOptions
} from '../../../irt';

export function doNodeHTTPRequest(request: HTTPClientRequest, options: HttpRequestOptions): PromiseEx<HTTPClientResponse> {
    const { logger } = options;
    const controller: {
        abort?: () => void
    } = {
    };

    const promise: PromiseEx<HTTPClientResponse> = new Promise(async (resolve, reject) => {
        try {
            const method = request.method;
            const headers = toHeadersMap(request.headers, logger);
            const payload = request.payload;

            const url = new URL(request.url);
            let path = url.pathname;
            if (url.search && url.search.length > 0) {
                path = path + url.search;
            }
            const opts: http.RequestOptions | https.RequestOptions = {
                hostname: url.hostname,
                port: url.port,
                path,
                method,
                headers: {
                    ...headers,
                    // @ts-ignore
                    ...(payload ? {'Content-length': `${payload.length}`} : {})
                },
                timeout: options.timeout >= 0 ? options.timeout : undefined
            };

            const process = (res: http.IncomingMessage) => {
                const hs: {[key: string]: string} = {};
                Object.keys(res.headers).forEach(k => {
                    const v = res.headers[k];
                    if (v) {
                        hs[k] = Array.isArray(v) ? v.join(', ') : v;
                    }
                })

                if (method === 'HEAD') {
                    resolve({
                        status: res.statusCode || 0,
                        headers: hs,
                        payload: ''
                    });
                    return;
                }

                let body = '';
                res.on('data', d => {
                    body += d;
                });
                res.on('end', function() {
                    resolve({
                        status: res.statusCode || 0,
                        headers: hs,
                        payload: body
                    });
                });
            }

            let req: http.ClientRequest; // RedirectableRequest<http.ClientRequest, http.IncomingMessage>; // http.ClientRequest;
            switch (url.protocol) {
                case 'http:':
                    req = http.request(opts, process);
                    break;

                case 'https:':
                    req = https.request(opts, process);
                    break;

                default:
                    reject (new Error(`Unsupported protocol '${url.protocol}'.`));
                    return;
            }
            controller.abort = req.destroy;

            req.on('error', err => {
                reject (new Error(`Failure during request ${err}`));
            });

            if (payload && method !== 'GET' && method !== 'HEAD' ) {
                req.write(payload);
            }
            req.end();
        } catch (err) {
            reject(err);
        }
    });
    promise.cancel = () => controller.abort ? controller.abort() : {};
    return promise;
}