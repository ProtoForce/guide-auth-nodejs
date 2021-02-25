import { BasicField } from './common';
import { OnWireType } from './wire';

/**
 * REST path segment, explicit text
 */
export interface PathSegmentWord {
    type: 'word';
    value: string;
}

/**
 * REST path segment parameter
 */
export interface PathSegmentParameter {
    type: 'param';
    /**
     * Field to take the parameter from
     */
    field: BasicField;
    /**
     * Field location
     */
    path: BasicField[];
    /**
     * On wire details for the type
     */
    onWire: OnWireType;
}

/**
 * REST Path segment
 */
export type PathSegment = PathSegmentWord | PathSegmentParameter;