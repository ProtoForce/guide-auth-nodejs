
import { ClientTransport, InData, ClientTransportMeta, OutData } from '../transport';
import { Logger, LogLevel } from '../../logger';
import { Codec, CodecDataTypes } from '../../codec';
import {
    HTTPTransportHeaders,
} from '../http';
import {
    HTTPClientTransportOptions,
    HTTPWebsocketClientTransportOptions,
    HTTPClientResponse
} from './common';
import { HTTPClientTransport } from './transport.http.client';
import { WebSocketClientTransport } from './transport.websocket.client';
import { WithRTTI } from '../../rtti';
import { PromiseEx } from '../../types';

export class HTTPHybridTransport<C = void, ZC = unknown, R extends HTTPClientResponse = HTTPClientResponse> implements ClientTransport<C> {
    protected httpTransport: HTTPClientTransport<C>;
    protected websocketTransport: WebSocketClientTransport<C>;
    protected connected: boolean;
    protected logger: Logger | undefined;

    constructor(
        endpoint: string,
        wsEndpoint: string,
        options?: {
            logger?: Logger,
            codecs: {[key: string]: Codec<CodecDataTypes>},
        },
        httpOptions?: Partial<HTTPClientTransportOptions<R>>,
        websocketOptions?: Partial<HTTPWebsocketClientTransportOptions<ZC>>,
    ) {
        this.connected = false;
        this.logger = options ? options.logger : undefined;
        this.httpTransport = new HTTPClientTransport(
            endpoint,
            {
                ...(options || {}),
                ...(httpOptions || {}),
            },
        );
        this.websocketTransport = new WebSocketClientTransport(
            wsEndpoint,
            {
                ...(options || {}),
                ...(websocketOptions || {}),
            },
        );
        this.onStatusChanged = this.onStatusChanged.bind(this);
        this.websocketTransport.onStatusChanged = this.onStatusChanged;
    }

    public getHttpTransport() {
        return this.httpTransport;
    }

    public getWebsocketTransport() {
        return this.websocketTransport;
    }

    public setHeaders(headers?: HTTPTransportHeaders) {
        this.httpTransport.setHeaders(headers);
        this.websocketTransport.setHeaders(headers);
    }

    protected onStatusChanged(connected: boolean) {
        this.connected = connected;
        if (this.logger) {
            this.logger.logf(LogLevel.Debug, `WebSocket connection status: ${connected}`);
        }
    }


    send<I extends InData, O extends OutData, IS, OS, HI, HO>(
        service: WithRTTI, method: string, data: I, meta: ClientTransportMeta<C, I, O, IS, OS, HI, HO>): PromiseEx<O> {
        return this.connected ?
            this.websocketTransport.send(service, method, data, meta)
            :
            this.httpTransport.send(service, method, data, meta);
    }
}