import {
    Codec,
    WithStaticEncoder,
    WithStaticDecoder,
    EncoderProxy,
    DecoderProxy
} from '../codec';

/**
 * WithStaticJSONCodec is a generic JSON codec type, which can encode and decode
 */
export type WithStaticJSONCodec<T, TS, H> =
    WithStaticEncoder<T, TS, H> &
    WithStaticDecoder<T, TS, H>;

/**
 * Implementation of a JSON codec, with the final type being a string
 */
export class JSONCodec implements Codec<string> {
    private pretty: boolean;

    public constructor(pretty: boolean = false) {
        this.pretty = pretty;
    }

    /**
     * Helper method to finalize the encoding. Mostly used in websockets, where double encoding
     * is avoided by using intermediate - proxy state.
     * @param data Intermediate object state, e.g. JSON
     * @param pretty Whether the finalizer should use pretty print when formatting the text
     */
    static encodeFinalizer = <IS>(data: IS, pretty: boolean) =>
    { return JSON.stringify(data, undefined, pretty ? 2 : undefined) }

    /**
     * Encodes the object to a JSON format
     * @param data The datum to be encoded
     * @param classRef Class reference which is used for encoding for non scalar types
     * @param withProxy If true, allows to encode via proxy, which allows to use native JSON before emitting the final string
     */
    public encode<I, IS, H>(data: I, classRef?: WithStaticJSONCodec<I, IS, H>, withProxy?: boolean): string | EncoderProxy<string, IS> {
        const prepared = (classRef ? classRef.toJSON(data) : data) as IS;
        const finalizer = (data: IS) => JSONCodec.encodeFinalizer(data, this.pretty);
        if (withProxy) {
            return new EncoderProxy(prepared, finalizer);
        } else {
            return finalizer(prepared);
        }
    }

    /**
     * Helper method to finalize the decoding. Mostly used in websockets, where double decoding is avoided
     * by using intermediate - proxy state.
     * @param data Intermediate object state
     * @param classRef Clas reference which is used for decoding for non scalar types
     */
    static decodeFinalizer = <OS, O, H>(data: OS | O, classRef?: WithStaticDecoder<O, OS, H>) =>
    { return classRef ? classRef.fromJSON(data as OS) : data as O; }

    /**
     * Decodes the string into a final type
     * @param data String representation of an encoded object
     * @param classRef Class reference which is used for decoding for non scalar types
     * @param withProxy If true, the string will be decoded into an intermediate, native JSON type, before converting to an actual class when needed
     */
    public decode<O, OS, H>(data: string, classRef?: WithStaticJSONCodec<O, OS, H>, withProxy?: boolean): O | DecoderProxy<O, OS> {
        const parsed = JSON.parse(data) as OS | O;
        const finalizer = (data: OS | O) => JSONCodec.decodeFinalizer(data, classRef);
        if (withProxy) {
            return new DecoderProxy(parsed, finalizer) as DecoderProxy<O, OS>;
        } else {
            return finalizer(parsed);
        }
    }
}

/**
 * JSON encoded polymorphic type with a class name located in a field
 */
export type JSONWithTypeField<TS> =
    {
        [typeField: string]: string | string[]
    } & TS;

/**
 * JSON encoded polymorphic type with a class name located in a field
 * while the value being a scalar stored in the value field.
 */
export type JSONWithScalarTypeField<TS> =
    {
        [typeField: string]: string | string[] | TS;
        value: TS;
    };

/**
 * JSON encoded polymorphic type with a class name being a key and the value being nested
 */
export type JSONWithTypeNested<TS> =
    {
        [typeName: string]: TS
    };