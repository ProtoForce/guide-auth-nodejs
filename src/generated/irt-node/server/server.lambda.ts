import {
    HTTPMethod,
    SystemContext,
    LogLevel,
    ConnectionContext,
    ServiceDispatcher,
    ServiceDispatcherAware
} from '../../irt';
import {
    HttpServerGeneric,
    HTTPServerOptions,
    HTTPServerRequest,
    HTTPServerResponse,
} from './server.http';

export interface LambdaELBRequestContext {
    targetGroupArn: string; // Example: "arn:aws:elasticloadbalancing:us-east-2:123456789012:targetgroup/lambda-279XGJDqGZ5rsrHC2Fjr/49e9d65c45c6791a"
}

export interface LambdaELBEvent {
    requestContext:        LambdaELBRequestContext;
    httpMethod:            'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
    path:                  string;                  // For example: /path
    queryStringParameters: {[key: string]: string}; // abc: def
    headers:               {[key: string]: string};
    body?:                 string;
    isBase64Encoded:       boolean;
}

export interface LambdaResponse {
    statusCode:            number;
    headers:               {[key: string]: string};
    body?:                 string;
}

export interface LambdaHTTPServerTransportContext<LContext, LCallback> {
    context: LContext;
    callback: LCallback;
    event: LambdaELBEvent;
    resp: LambdaResponse;
}

export type LambdaServerContext<C, LContext, LCallback> = ConnectionContext<C, LambdaHTTPServerTransportContext<LContext, LCallback>>;

export class LambdaHttpServer<C = void, LContext = void, LCallback = void> extends HttpServerGeneric<C, LambdaHTTPServerTransportContext<LContext, LCallback>> {
    constructor(endpoint: string,
                services: (ServiceDispatcher<LambdaServerContext<C, LContext, LCallback>> | ServiceDispatcherAware<LambdaServerContext<C, LContext, LCallback>>)[],
                options: Partial<HTTPServerOptions<C, LambdaHTTPServerTransportContext<LContext, LCallback>>> = {}) {
        super(endpoint, services, options);
        this.serverRequestHandler = this.serverRequestHandler.bind(this);
    }

    public async lambda(event: LambdaELBEvent, lc: LContext, callback: LCallback): Promise<HTTPServerResponse> {
        return new Promise<HTTPServerResponse>(async (resolve, reject) => {
            const lr: LambdaResponse = {
                statusCode: 200,
                headers: {},
            }
            try {
                await this.serverRequestHandler(lr, event, lc, callback);
                resolve(lr);
            } catch (e) {
                reject(e);
            }
        });
    }

    protected async serverRequestHandler(lr: LambdaResponse, event: LambdaELBEvent, lc: LContext, callback: LCallback) {
        const context = new ConnectionContext<C, LambdaHTTPServerTransportContext<LContext, LCallback>>({
            resp: lr,
            context: lc,
            callback,
            event
        });
        if (event.headers.authorization) {
            context.system.auth.updateFromValue(event.headers.authorization);
        }
        const qp = Object.keys(event.queryStringParameters);
        const r: HTTPServerRequest = {
            method: HTTPMethod[event.httpMethod],
            path: event.path + (qp.length > 0 ? '?'+ qp.map(q => q + '=' + event.queryStringParameters[q]).join('&') : ''),
            headers: event.headers,
        };

        await this.processRequest(context, r);
    }

    protected handleRequestBody(context: ConnectionContext<C, LambdaHTTPServerTransportContext<LContext, LCallback>>, request: HTTPServerRequest): string | undefined {
        return context.system.transport.event.body;
    }

    protected handleResponse(context: ConnectionContext<C, LambdaHTTPServerTransportContext<LContext, LCallback>>, request: HTTPServerRequest, response: HTTPServerResponse): void {
        if (typeof response.body !== 'string') {
            throw new Error('Currently only string is supported as a return type for lambda server.');
        }
        const { logger } = this.options;
        context.system.transport.resp.body = response.body;
        if (response.headers) {
            for (const h of Object.keys(response.headers)) {
                const hv = response.headers[h];
                if (typeof hv === 'undefined') {
                    continue;
                }
                if (Array.isArray(hv)) {
                    logger.logf(LogLevel.Warning, `Lambda backend doesn't support array headers, got [${hv.join(', ')}] for header ${h}`)
                    context.system.transport.resp.headers[h] = hv[0];
                } else {
                    context.system.transport.resp.headers[h] = hv;
                }
            }
        }

        context.system.transport.resp.statusCode = response.statusCode;
    }
}