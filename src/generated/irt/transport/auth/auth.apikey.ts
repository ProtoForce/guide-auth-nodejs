import { AuthMethod } from './auth.method';

/**
 * Api-Key authorization
 */
export class AuthApiKey extends AuthMethod {
    /**
     * Api-Key value
     */
    public apiKey: string;

    constructor(apiKey: string) {
        super();
        this.apiKey = apiKey;
    }

    /**
     * Fill in ApiKey value from a string
     * @param value String value prefixed with Api-Key or ApiKey, etc. Returns an Error if it has invalid format
     */
    public fromValue(value: string): Error | undefined {
        const vl = value.toLowerCase();
        if (vl.indexOf('api-key ') === 0) {
            this.apiKey = value.substr(8);
            return undefined;
        }

        if (vl.indexOf('apikey ') === 0) {
            this.apiKey = value.substr(7);
            return undefined;
        }

        return new Error('api key authorization must start with ApiKey, got ' + value)
    }

    /**
     * Convert Api-Key authorization value
     */
    public toValue(): string {
        return 'Api-Key ' + this.apiKey;
    }
}