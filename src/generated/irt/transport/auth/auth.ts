import { AuthMethod } from './auth.method';
import { AuthCustom } from './auth.custom';
import { AuthToken } from './auth.token';
import { AuthApiKey } from './auth.apikey';
import { AuthNone } from './auth.none';
// import { AuthBasic } from './auth.basic';

/**
 * Authorization class 
 */
export class Authorization {
    /**
     * Authorization method, default value is AuthNone
     */
    public method: AuthMethod;

    constructor() {
        this.method = new AuthNone();
    }

    /**
     * Updates authorization from a string. Setting up to Custom, Token, ApiKey or others
     * @param auth String value holding authorization details
     */
    public updateFromValue(auth?: string): Error | undefined {
        if (typeof auth === 'undefined') {
            this.method = new AuthNone();
            return undefined;
        }

        const pieces = auth.split(' ');
        if (pieces.length !== 2) {
            if (auth.length > 0) {
                this.method = new AuthCustom(auth);
                return undefined;
            }

            return new Error('authorization update expects "type value" format, got ' + auth);
        }

        switch (pieces[0].toLowerCase()) {
            case 'bearer': this.method = new AuthToken(pieces[1]);
                break;
            case 'apikey':
            case 'api-key':
                this.method = new AuthApiKey(pieces[1]);
                break;
            // case 'basic': {
            //     const basic = new AuthBasic();
            //     basic.fromValue(pieces[1]);
            //     this.method = basic;
            // } break;
            default:
                this.method = new AuthCustom(auth);
            // return new Error('unsupported authorization mechanism ' + auth);
        }

        return undefined;
    }

    /**
     * Convers authorization method to a string value
     */
    public toValue(): string {
        if (!this.method) {
            return '';
        }
        return this.method.toValue()
    }
}