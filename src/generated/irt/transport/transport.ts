
import { RestSpec } from './rest';
import {
    WithStaticEncoder,
    WithStaticDecoder
} from '../codec';
import { HTTPSpec } from './http';
import {
    WithRTTI
} from '../rtti';
import {
    PromiseEx
} from '../types';

export type WithRestSpecMaybe = {
    restSpec?: RestSpec;
}

export type WithHTTPSpecMaybe<T> = {
    httpSpec?: (value: T) => HTTPSpec;
}

export type InData = unknown;
export type InDataClass<T, TS, H> = WithStaticEncoder<T, TS, H>;

export type OutData = unknown;
export type OutDataClass<T, TS, H> = WithStaticDecoder<T, TS, H>;

export interface ClientTransportMeta<C, I, O, IS, OS, HI, HO> {
    in?: InDataClass<I, IS, HI> & WithRestSpecMaybe;
    out?: OutDataClass<O, OS, HO>;
    alternative?: boolean;
    context?: C;
}

export interface ClientTransport<C = void> {
    send<I extends InData, O extends OutData, IS, OS, HI, HO>(
        service: WithRTTI,
        method: string,
        data: I,
        meta: ClientTransportMeta<C, I, O, IS, OS, HI, HO>): PromiseEx<O>;
}

export interface ClientSocketTransport<C = void> extends ClientTransport<C> {
}

// export interface ServerSocketTransport {
//     send(service: string, method: string, data: InData): Promise<OutData>
// }

export interface ServerTransportMeta<I, O, IS, OS, HI, HO> {
    // For server we swap, as we need to have encoder and decoder
    // in different direction
    in?: OutDataClass<I, IS, HI> & WithRestSpecMaybe;
    out?: InDataClass<O, OS, HO> & WithHTTPSpecMaybe<O>;
    alternative?: boolean;
}