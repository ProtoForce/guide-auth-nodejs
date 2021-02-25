
import { BuiltinType } from './builtintypes';

/**
 * TypeRef defines a type in runtime for reflection purposes
 */
export interface TypeRef {
    /**
     * Type ID
     */
    id: BuiltinType | string; // For user types will be string
    /**
     * Generic arguments if are needed for the type
     */
    args: TypeRef[];
}