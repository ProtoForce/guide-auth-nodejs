
import { TypeRef } from './typeref';

/**
 * On Wire scalar value
 */
export interface OnWireScalar {
    type: 'scalar';
    ref: TypeRef;
}

/**
 * On Wire generic option
 */
export interface OnWireGenericOption {
    type: 'generic';
    ref: TypeRef;
    generic: 'option';
}

/**
 * On Wire generic list or set
 */
export interface OnWireGenericList {
    type: 'generic';
    ref: TypeRef;
    generic: 'list';
    unpacked: boolean;
}

/**
 * On Wire generic map
 */
export interface OnWireGenericMap {
    type: 'generic';
    ref: TypeRef;
    generic: 'map';
}

/**
 * On Wire generic types
 */
export type OnWireGeneric =
    | OnWireGenericOption
    | OnWireGenericList
    | OnWireGenericMap;

/**
 * On Wire type details
 */
export type OnWireType = OnWireScalar | OnWireGeneric;