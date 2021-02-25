
/**
 * Encoder proxy which allows intermediate data state to avoid double encoding
 * in case of helper wrappers around the types, specifically used in websockets
 */
export class EncoderProxy<T extends CodecDataTypes, D = unknown> {
    data: D;
    finalize: (data: D) => T;
    constructor(data: D, finalize: (data: D) => T) {
        this.data = data;
        this.finalize = finalize;
    }
}

/**
 * Decoder proxy which allows intermediate data state to avoid double decoding
 * in case of helper wrappers around the types, specifically used in websockets
 */
export class DecoderProxy<C, D = unknown> {
    data: D;
    finalize: (data: D) => C;
    constructor(data: D, finalize: (data: D) => C) {
        this.data = data;
        this.finalize = finalize;
    }
}

/**
 * Supported codec data types
 */
export type CodecDataTypes = Blob | BufferSource | FormData | ReadableStream<Uint8Array> | string;

/**
 * Generic interface for a Codec, which can encode and decode
 */
export interface Codec<T extends CodecDataTypes> {
    encode<I, IS, H>(data: I, classRef?: WithStaticEncoder<I, IS, H>, withProxy?: boolean): T | EncoderProxy<T, IS>;
    decode<O, OS, H>(data: T, classRef?: WithStaticDecoder<O, OS, H>, withProxy?: boolean): O | DecoderProxy<O, OS>;
}

/**
 * Helper interface to define a class with an encoder
 */
export interface WithStaticEncoder<T, TS, H> {
    new(...args: any[]): H;
    toJSON: (d: T) => TS;
}

/**
 * Helper interface to define a class with an decoder
 */
export interface WithStaticDecoder<T, TS, H> {
    new(...args: any[]): H;
    fromJSON: (d: TS) => T;
}

/**
 * Helper interface to define a class with an encoder method
 */
export interface WithEncoder<TS> {
    toJSON(): TS;
}