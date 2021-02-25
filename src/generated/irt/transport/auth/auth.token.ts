import { AuthMethod } from './auth.method';

/**
 * Authorization type - Token
 */
export class AuthToken extends AuthMethod{
    /**
     * Authorization token
     */
    public token: string;

    constructor(token: string) {
        super();
        this.token = token;
    }

    /**
     * Fills in AuthToken from a string value, must be prefixed with Bearer
     * @param value String value holding the token
     */
    public fromValue(value: string): Error | undefined {
        if (value.indexOf('Bearer ') !== 0) {
            return new Error('token authorization must start with Bearer, got ' + value)
        }
        this.token = value.substr(7);
        return undefined;
    }

    /**
     * Convers authorization token to a string value
     */
    public toValue(): string {
        return 'Bearer ' + this.token;
    }
}