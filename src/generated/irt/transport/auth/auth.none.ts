import { AuthMethod } from './auth.method';

/**
 * Authorization method is absent, set to None
 */
export class AuthNone extends AuthMethod {
    public fromValue(value: string): Error | undefined {
        return undefined;
    }

    public toValue(): string {
        return '';
    }
}