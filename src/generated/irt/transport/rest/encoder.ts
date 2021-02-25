import { TypeRef } from '../../types/typeref';
import {
    OnWireScalar,
    OnWireGenericList,
    OnWireGenericOption,
    OnWireGenericMap,
    OnWireType,
    OnWireGeneric
} from './wire';

/**
 * Encodes a type into an URI value
 * @param value Value to be encoded
 * @param ref Value type
 */
export function encodeURIValue(value: unknown, ref: TypeRef): string {
    switch (ref.id) {
        case 'i08':
        case 'i16':
        case 'i32':
        case 'i64':
        case 'u08':
        case 'u16':
        case 'u32':
        case 'u64':
        case 'f32':
        case 'f64':
            if (typeof value !== 'number') {
                throw new Error('number type is expected for ref.id ' + ref.id);
            }
            return value.toString(10);

        case 'big':
            if (typeof value === 'string') {
                return value;
            } else
            if (typeof value === 'number') {
                return value.toString(10);
            } else {
                throw new Error('string or number type is expected for ref.id ' + ref.id);
            }

        case 'blob':
            if (typeof value !== 'string') {
                throw new Error('string type is expected for ref.id ' + ref.id);
            }
            return value;

        case 'bit':
            if (typeof value !== 'boolean') {
                throw new Error('boolean type is expected for ref.id ' + ref.id);
            }
            return value ? 'true' : 'false';

        case 'str':
        case 'uid':
        // Times and Dates are already strings
        case 'tsl':
        case 'tso':
        case 'tsu':
        case 'time':
        case 'date':
            if (typeof value !== 'string') {
                throw new Error(`string type is expected for ref.id ${ref.id}, got: ${typeof value}. Value: ${JSON.stringify(value)}`);
            }
            return encodeURIComponent(value as string);

        case 'set':
        case 'lst':
            if (!Array.isArray(value)) {
                throw new Error('array type is expected for ref.id ' + ref.id);
            }
            if (ref.args.length !== 1) {
                throw new Error('set/lst expect one arg');
            }

            return value.map(v => encodeURIValue(v, ref.args[0])).join(',');

        case 'map':
            if (ref.args.length !== 2) {
                throw new Error('Map expects two args');
            }
            if (typeof value !== 'object' || value === null) {
                throw new Error('object type is expected for ref.id ' + ref.id);
            }

            // We ignore key as they are always strings in JSON, so we
            // only encode the value.
            return Object.keys(value).map(key => `${key}:${encodeURIValue(value[key], ref.args[1])}`).join(',');

        case 'err':
        case 'any':
        case 'opt':
            throw new Error('Only scalars are supported in encodeURIValue, got: ' + ref.id);

        default:
            throw new Error(`encodeURIValue got an unexpected ref.id: ${ref.id}`);
    }
}

/**
 * Decodes a URI encoded value to an actual value
 * @param value URI encoded value
 * @param ref Value type
 */
export function decodeURIValue(value: string, ref: TypeRef): unknown {
    switch (ref.id) {
        case 'i08':
        case 'i16':
        case 'i32':
        case 'i64':
        case 'u08':
        case 'u16':
        case 'u32':
        case 'u64':
            return parseInt(value, 10);

        case 'f32':
        case 'f64':
            return parseFloat(value);

        case 'big':
            // This one might be converted to a number,
            // but we just keep it as string, as it is
            // also supported.
            return value;

        case 'blob':
            return value;

        case 'bit':
            return value === 'true';

        case 'str':
        case 'uid':
        case 'tsl':
        case 'tso':
        case 'tsu':
        case 'time':
        case 'date':
            return value;

        case 'set':
        case 'lst':
            if (ref.args.length !== 1) {
                throw new Error('Set/List expect one arg');
            }
            return value.split(',').map(v => decodeURIValue(v, ref.args[0]));

        case 'map':
            if (ref.args.length !== 2) {
                throw new Error('Map expects two args');
            }
            const res: {[key: string]: unknown} = {};
            value.split(',').forEach(kv => {
                const [key, value] = kv.split(':');
                // We ignore key as they are always strings in JSON, so we
                // only encode the value.
                res[key] = decodeURIValue(value, ref.args[1]);
            });
            return res;

        case 'err':
        case 'any':
        case 'opt':
            throw new Error('Only scalars are supported in decodeURIValue, got: ' + ref.id);

        default:
            throw new Error(`decodeURIValue got an unexpected ref id: ${ref.id}`);
    }
}

/**
 * Encode a scalar value for the URL, to a format key=value
 * @param key Name of the scalar
 * @param onWire Scalar on wire details
 * @param value Scalar value
 */
export function encodeWireScalar(key: string, onWire: OnWireScalar, value: unknown): string {
    return `${key}=${encodeURIValue(value, onWire.ref)}`;
}

/**
 * Encode an optional value into a URI. If a value is not present, this encodes to an empty string.
 * If a value is present, it is encoded into a key=value format
 * @param key Name of the value
 * @param onWire On wire details
 * @param value Value
 */
export function encodeWireOption(key: string, onWire: OnWireGenericOption, value: unknown): string {
    if (typeof value === 'undefined') {
        return '';
    }

    // In case of options, we need to unpack the first layer of ref, as it
    // is already included into the onWire model.
    if (onWire.ref.id !== 'opt' || onWire.ref.args.length !== 1) {
        throw new Error('OnWireGenericOption must have single argument and ref id opt. Got ' + JSON.stringify(onWire));
    }

    return `${key}=${encodeURIValue(value, onWire.ref.args[0])}`;
}

/**
 * Encode a generic list to a URI value, in the format key=value&key=value2 OR key=value,value2
 * @param key Name of the list
 * @param onWire On wire details
 * @param value Value
 */
export function encodeWireList(key: string, onWire: OnWireGenericList, value: unknown): string {
    if (onWire.unpacked) {
        if (!Array.isArray(value) || (onWire.ref.id !== 'lst' && onWire.ref.id !== 'set') || onWire.ref.args.length !== 1) {
            throw new Error('Unpacked onWireGenericList must have array value, lst/set id, and one arg.');
        }
        return value.map(v => `${key}=${encodeURIValue(v, onWire.ref.args[0])}`).join('&');
    } else {
        return `${key}=${encodeURIValue(value, onWire.ref)}`;
    }
}

/**
 * Encode a generic map into a URI value, in format key=mapkey1:value1,mapkey2:value2
 * @param key Name of the map
 * @param onWire On wire details
 * @param value Value
 */
export function encodeWireMap(key: string, onWire: OnWireGenericMap, value: unknown): string {
    return `${key}=${encodeURIValue(value, onWire.ref)}`;
}

/**
 * Encode a generic wire value into a URI value
 * @param key Name of the value
 * @param generic On wire details
 * @param value Value
 */
export function encodeWireGeneric(key: string, generic: OnWireGeneric, value: unknown): string {
    switch (generic.generic) {
        case 'option': return encodeWireOption(key, generic, value);
        case 'list': return encodeWireList(key, generic, value);
        case 'map': return encodeWireMap(key, generic, value);
    }
}

/**
 * Encode wire value into a URI value
 * @param key Name of the value
 * @param onWire On wire details
 * @param value Value
 */
export function encodeWireType(key: string, onWire: OnWireType, value: unknown): string {
    switch (onWire.type) {
        case 'scalar': return encodeWireScalar(key, onWire, value);
        case 'generic': return encodeWireGeneric(key, onWire, value);
    }
}