import { AuthMethod } from './auth.method';

/**
 * Custom authorization
 */
export class AuthCustom extends AuthMethod {
    /**
     * Authorization value
     */
    public value: string;
    constructor(value: string) {
        super();
        this.value = value;
    }

    /**
     * Custom authorization stores value as is
     * @param value Custom authorization value
     */
    public fromValue(value: string): Error | undefined {
        this.value = value;
        return undefined;
    }

    /**
     * Convert custom authorization to a string value
     */
    public toValue(): string {
        return this.value;
    }
}