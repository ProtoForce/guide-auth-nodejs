import { QueryParameter } from './query';
import { PathSegment } from './path';
import { BasicField } from './common';
import { HTTPMethod } from '../http';

/**
 * REST extractor specification
 */
export interface ExtractorSpec {
    /**
     * Query parameters
     */
    queryParameters: { [key: string]: QueryParameter };
    /**
     * Path parameters
     */
    pathSpec: PathSegment[];
}

/**
 * Body parameter
 */
export interface BodyParameter {
    /**
     * Field
     */
    field: BasicField;
    /**
     * Path to locate a field
     */
    path: BasicField[];
}

/**
 * Body specification
 */
export interface BodySpec {
    /**
     * Fields in the body
     */
    fields: BodyParameter[];
}

/**
 * REST annotation details
 */
export interface RestAnnotation {
    /**
     * Path for the REST request
     */
    path: string;
    /**
     * Method for the REST request
     */
    method: HTTPMethod;
}

/**
 * REST Specification
 */
export interface RestSpec {
    /**
     * Method
     */
    method: HTTPMethod;
    /**
     * Extractor specification
     */
    extractor: ExtractorSpec;
    /**
     * Body specification
     */
    body: BodySpec;
}