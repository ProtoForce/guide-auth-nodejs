
/**
 * Validator class provides a set of helpers to validate various types.
 * Extensively used to validate values which are assigned to properties of various types
 */
export class Validator {
    /**
     * Toggle which can be used to disable all validations
     */
    static enabled: boolean = true;

    /**
     * Checks whether a value is a valid guid
     * @param value Value to check
     * @param field Field name to be used for an error description
     */
    static guid(value: string, field: string) {
        if (!Validator.enabled || value.match('^[0-9a-fA-f]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$$')) {
            return;
        }

        throw new Error(`${field} is in the wrong format, expected guid but got: ${value}`);
    }

    /**
     * Checks whether a value is a valid integer
     * @param value Value to check
     * @param field Field name to be used for an error description
     */
    static integer(value: number, field: string) {
        if (!Validator.enabled || value % 1 === 0) {
            return;
        }

        throw new Error(`${field} is expected to be an integer`);
    }

    /**
     * Checks whether a value is within the minimal boundary
     * @param value Value to check
     * @param field Field name to be used for an error description
     */
    static min(value: number, min: number, field: string) {
        if (!Validator.enabled || value >= min) {
            return;
        }

        throw new Error(`${field} is expected to be not less than ${min}, got ${value}`);
    }

    /**
     * Checks whether a value is within the maximum boundary
     * @param value Value to check
     * @param field Field name to be used for an error description
     */
    static max(value: number, max: number, field: string) {
        if (!Validator.enabled || value <= max) {
            return;
        }

        throw new Error(`${field} is expected to be not greater than ${max}, got ${value}`);
    }

    /**
     * Checks whether a value is of an allowed type
     * @param value Value to check
     * @param expected Expected type
     * @param field Field name to be used for an error description
     */
    static ofType(value: unknown, expected: string, field: string) {
        if (!Validator.enabled) {
            return;
        }

        const t = typeof value;
        if (t === expected) {
            return;
        }

        throw new Error(`${field} is expected to be of type ${expected}, got ${t}`);
    }
}