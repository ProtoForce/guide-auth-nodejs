import jwt from 'jsonwebtoken';
import { TokensServerConfig, UserID } from '@auth/service';

import { authenticator, totp } from 'otplib';
authenticator.options = {digits: 6};
totp.options = {digits: 6};

// Sign some data with a key, resulting into a jwt token: jwt.io
function sign<T extends string | object>(data: T, key: string, expiration: number): string {
    return jwt.sign({
        data
    }, key, {
        algorithm: 'HS256',
        expiresIn: expiration
    });
}

// Parse a previously created jwt token and extract data
function parse<T extends string | object>(token: string, key: string): T | undefined {
    try {
        var decoded = jwt.verify(token, key);
        return decoded as T;
    } catch(err) {
        // Log an error here? Token seems to be invalid
        // More details on this here: https://github.com/auth0/node-jsonwebtoken
        return undefined;
    }
}

// Some default values to be used for test, in production
// should be taken from environment or configs
export const defaultTokensConfig = new TokensServerConfig({
    // Unique signing key
    jwtKey: '2d8g277f72387dy2..~387fgy246fg3qf',
    // Expiration time, 1 hour
    expiration: 60 * 60
});

// All possible tokens which are available for creation and parsing
export interface Tokens {
    // Authorization tokens, used by previously authenticated users to
    // access services.
    getAuthToken: (userID: UserID) => string;
    parseAuthToken: (token: string) => UserID | undefined;

    // Token issued for a two factor authentication.
    getTwoFactorToken: (userID: UserID) => string;
    parseTwoFactorToken: (token: string) => UserID | undefined;

    // Password reset token, used only for password resets.
    getPassResetToken: (userID: UserID) => string;
    parsePassResetToken: (token: string) => UserID | undefined;

    // Tokens used to confirm an email, hold inside the email to be confirmed.
    getEmailConfirmToken: (email: string) => string;
    parseEmailConfirmToken: (token: string) => string | undefined;

    // MFA Tokens: a bunch of methods to work with 2FA/MFA related operations,
    // such as checking the code, issusing a code, etc.
    mfaCheckAppAuthCode: (secret: string, providedToken: string) => boolean;
    mfaGenerateAppAuthCode: (secret: string) => string;
    mfaGenerateAppAuthSecret: () => string;
    mfaGetSignedSecretToken: (secret: string) => string;
    mfaParseSignedSecretToken: (token: string) => string | undefined;
}

export function createTokens(config: TokensServerConfig): Tokens {
    const getToken = (audience: string) => (userID: UserID) => {
        return sign({
            aud: audience,
            userID: userID.toJSON()
        }, config.jwtKey, config.expiration);
    };

    const parseToken = (audience: string) => (token: string) => {
        const res = parse<{aud: string, userID: string}>(token, config.jwtKey);
        if (!res || res.aud !== audience) {
            return undefined;
        }
        return UserID.fromJSON(res.userID);
    };

    const getStringToken = (audience: string) => (value: string) => {
        return sign({
            aud: audience,
            value
        }, config.jwtKey, config.expiration);
    };
    const parseStringToken = (audience: string) => (token: string) => {
        const res = parse<{aud: string, value: string}>(token, config.jwtKey);
        if (!res || res.aud !== audience) {
            return undefined;
        }
        return res.value;
    };

    return {
        getAuthToken: getToken('auth'),
        parseAuthToken: parseToken('auth'),
        getTwoFactorToken: getToken('2fa'),
        parseTwoFactorToken: parseToken('2fa'),
        getPassResetToken: getToken('passReset'),
        parsePassResetToken: parseToken('passReset'),
        getEmailConfirmToken: getStringToken('emailConfirm'),
        parseEmailConfirmToken: parseStringToken('emailConfirm'),

        mfaCheckAppAuthCode: (secret: string, providedToken: string): boolean => {
            try {
                return authenticator.check(providedToken, secret);
            } catch (err) {
                return false;
            }
        },
        mfaGenerateAppAuthCode: (secret: string): string => authenticator.generate(secret),
        mfaGenerateAppAuthSecret: (): string => authenticator.generateSecret(),
        mfaGetSignedSecretToken: getStringToken('2faSecret'),
        mfaParseSignedSecretToken: parseStringToken('2faSecret')
    };
}
