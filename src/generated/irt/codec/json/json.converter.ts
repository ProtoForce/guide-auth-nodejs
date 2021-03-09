import { WithRTTI } from '../../rtti';
import {
    JSONWithScalarTypeField,
    JSONWithTypeNested,
    JSONWithTypeField
} from './json.codec';
import {
    blobToString,
    blobFromString
} from '../../types/tools';
import { WithEncoder } from '../codec';

/**
 * A set of helpers to convert types to JSON representation.
 */
export class JSONConverter {
    static withTypeField = <T extends WithRTTI & WithEncoder<TS>, TS>(value: T, field: string, name?: string): JSONWithTypeField<TS> => {
        const typeName = name || value.RTTI_FQN;
        const values = value.toJSON();
        // @ts-ignore values in this case is an object
        const existingField = values[field];
        const fieldValue =
                typeof existingField === 'undefined' ? typeName :
                Array.isArray(existingField) ? [typeName, ...existingField] : [typeName, existingField];

        return {
            ...values,
            [field]: fieldValue
        };
    };

    static withScalarTypeField = <T>(value: T, field: string, name: string): JSONWithScalarTypeField<T> => {
        return {
            [field]: name,
            value
        };
    };

    static withTypeNested = <T extends WithRTTI & WithEncoder<TS>, TS>(value: T, name?: string): JSONWithTypeNested<TS> => {
        const typeName = name || value.RTTI_FQN;
        return {
            [typeName]: value.toJSON()
        };
    };

    static toBigintJSON = (value: bigint): string | number => {
        // TODO Fix to be 2**64
        const min = BigInt(-2147483648);
        const max = BigInt(2147483647);
        if (value >= min && value <= max) {
            return Number(value);
        }

        // @ts-ignore
        return value.toString(16);
    };

    static fromBigintJSON = (value: string | number): bigint => {
        return BigInt(value);
    };

    static toBlobJSON = (value: Uint8Array): string => {
        return blobToString(value);
    };

    static fromBlobJSON = (value: string): Uint8Array => {
        return blobFromString(value);
    };
}