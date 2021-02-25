
/**
 * REST type reference
 */
export interface TypeRef {
    /**
     * Type identifier
     */
    id: string;
    /**
     * Generic arguments
     */
    args: TypeRef[];
}