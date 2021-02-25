import { BasicField } from './common';
import { OnWireType } from './wire';

/**
 * REST Query Parameter
 */
export interface QueryParameter {
    /**
     * Field to be used for the query parameter
     */
    field: BasicField;
    /**
     * Path to locate the field
     */
    path: BasicField[];
    /**
     * On wire details for the type
     */
    onWire: OnWireType;
}