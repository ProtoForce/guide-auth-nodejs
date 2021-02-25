
import { TypeRef } from '../../types/typeref';

/**
 * Basic REST field, has a name and a type
 */
export interface BasicField {
    /**
     * Name of the field
     */
    name: string;
    /**
     * Type of the field
     */
    ref: TypeRef;
}