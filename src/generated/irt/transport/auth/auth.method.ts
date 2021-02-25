
/**
 * Asbtract class for Authorization methods
 */
export abstract class AuthMethod {
    /**
     * Creation of an authorization method from a string value
     * @param value Authorization value
     */
    public abstract fromValue(value: string): Error | undefined;

    /**
     * Converts authorization method to a string value
     */
    public abstract toValue(): string;
}