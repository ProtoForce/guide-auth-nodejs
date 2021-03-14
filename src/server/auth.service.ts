import {
    Either,
    Logger,
    LogLevel,
    Random,
    Right
} from '@auth/irt';
import {
    AuthServiceChangePasswordOutput,
    AuthServiceConfirmEmailOutput,
    AuthServiceConfirmPhoneOutput,
    AuthServiceResetPasswordOutput,
    AuthServiceServerBase,
    AuthServiceSigninOutput,
    AuthServiceSignupOutput,
    GenericSuccess,
    randomUserID,
    SignIn,
    SigninResponse,
    SigninResponseConfirm2FA,
    SigninSuccessResponse,
    SignUp,
    User,
    UserLookup,
    ServerConfig
} from '@auth/service';

import { ServiceContext } from './context';
import { invokeAlreadyExistsError, invokeInternalError, invokeNotFoundError } from './errors';
import { Tokens } from './tokens';
import { PhoneContact, RepoAlreadyExistsError, UserContact, UserRecord, UsersRepo } from './users.repo';
import {
    sendEmail,
    sendSMS,
    httpRequest,
    hashPassword,
    lookupFromEmail,
    lookupFromPhone,
    sanitizeEmail,
    sanitizePhone,
    generatePhoneCode
} from './utils';

// Auth service implementation
export class AuthServiceImpl extends AuthServiceServerBase<ServiceContext> {
    private logger: Logger;
    private usersRepo: UsersRepo;
    private tokens: Tokens;
    private config: ServerConfig;

    constructor(logger: Logger, usersRepo: UsersRepo, tokens: Tokens, config: ServerConfig) {
        super();
        this.logger = logger;
        this.logger.logf(LogLevel.Info, 'Created AuthService');
        this.usersRepo = usersRepo;
        this.tokens = tokens;
        this.config = config;
    }

    protected async verifyGoogle(token: string): Promise<{ email: string }> {
        // Here is a code example for client side (browser)
        // import * as queryString from 'query-string';

        // const stringifiedParams = queryString.stringify({
        //   client_id: process.env.CLIENT_ID_GOES_HERE,
        //   redirect_uri: 'http://localhost:3000/authenticate/google',
        //   scope: [
        //     'https://www.googleapis.com/auth/userinfo.email',
        //     'https://www.googleapis.com/auth/userinfo.profile',
        //   ].join(' '), // space seperated string
        //   response_type: 'code',
        //   prompt: 'consent'
        // });
        // const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
        // Redirect the user to google login url and you should receive back the token

        const payload = {
            client_id: this.config.google.clientId,
            client_secret: this.config.google.clientSecret,
            redirect_uri: this.config.google.redirectUrl,
            grant_type: 'authorization_code',
            code: token
        };

        const tokenData = await httpRequest<{
            access_token: string,
            expires_in: number,
            token_type: string,
            refresh_token: string
        }, typeof payload>(
            {method: 'POST', payload},
            'https://oauth2.googleapis.com/token'
        );

        const info = await httpRequest<{
            id: string,
            email: string,
            given_name: string,
            family_name: string
        }>(
            {method: 'GET'},
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
                'Authorization': `Bearer ${tokenData.access_token}`
            }
        );

        return {
            email: info.email
        };
    }

    protected async verifyGithub(token: string): Promise<{ email: string }> {
        // Do we need to extend the token here somehow?
        const payload = {
            client_id: this.config.github.clientId,
            client_secret: this.config.github.clientSecret,
            code: token
        };
        const tokenData = await httpRequest<{access_token: string}, typeof payload>(
            {method: 'POST', payload},
            'https://github.com/login/oauth/access_token'
        );

        const emails = await httpRequest<{email: string, primary: boolean, verified: boolean}[]>(
            {method: 'GET'},
            `https://api.github.com/user/emails?access_token=${tokenData.access_token}`
        );

        let email: string | undefined;
        const primary = emails.find(e => e.primary && e.verified);
        if (primary) {
            email = primary.email;
        } else {
            const other = emails.find(e => e.verified);
            if (other) {
                email = other.email;
            } else {
                throw new Error(`Can't find a verified email in github auth response`);
            }
        }
        return {email};
    }

    protected async verifyFacebook(accessToken: string): Promise<{ email: string }> {
        // Do we need to extand the token here somehow?
        // More details on permissions: https://developers.facebook.com/docs/permissions/reference
        const info = await httpRequest<{id: string, email: string}>(
            {method: 'GET'},
            `https://graph.facebook.com/me?fields=email&access_token=${accessToken}`
        );
        return {email: info.email};
    }

    protected async verifyTwitter(token: string): Promise<{ email: string }> {
        // Do we need to extand the token here somehow?
        const info = await httpRequest<{email: string}>(
            {method: 'GET'},
            `https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true`,
            {
                'Authorization': `Bearer ${token}`
            }
        );

        return {email: info.email};
    }

    signup(context: ServiceContext, with_: SignUp): Promise<Either<AuthServiceSignupOutput, SigninSuccessResponse>> {
        return new Promise(async resolve => {
            try {
                const {
                    contact,
                    pass
                } = await with_.match<Promise<{
                    contact: UserContact,
                    pass?: string
                }>>(
                    async whenEmail => ({
                        contact: {
                            type: 'email',
                            email: sanitizeEmail(whenEmail.email),
                            original: whenEmail.email,
                            verified: false
                        },
                        pass: whenEmail.pass
                    }),
                    async whenPhone => ({
                        contact: {
                            type: 'phone',
                            phone: sanitizePhone(whenPhone.number_),
                            original: whenPhone.number_,
                            verified: false,
                            code: generatePhoneCode()
                        },
                        pass: whenPhone.pass
                    }),
                    async whenGoogle => {
                        const res = await this.verifyGoogle(whenGoogle.accessToken);
                        return {
                            contact: {
                                type: 'email',
                                email: res.email,
                                original: res.email,
                                verified: true
                            },
                        };
                    },
                    async whenGithub => {
                        const res = await this.verifyGithub(whenGithub.accessToken);
                        return {
                            contact: {
                                type: 'email',
                                email: res.email,
                                original: res.email,
                                verified: true
                            },
                        };
                    },
                    async whenFacebook => {
                        const res = await this.verifyFacebook(whenFacebook.accessToken);
                        return {
                            contact: {
                                type: 'email',
                                email: res.email,
                                original: res.email,
                                verified: true
                            },
                        };
                    },
                    async whenTwitter => {
                        const res = await this.verifyTwitter(whenTwitter.accessToken);
                        return {
                            contact: {
                                type: 'email',
                                email: res.email,
                                original: res.email,
                                verified: true
                            },
                        };
                    }
                );

                const passSalt = Random.nextUUID();

                const record: UserRecord = {
                    user: new User({
                        name: '',
                        id: randomUserID(),
                        verified: contact.verified
                    }),
                    timezone: with_.value.timezone,
                    passHash: pass ? hashPassword(pass, passSalt) : undefined,
                    passSalt,
                    contacts: [contact]
                };

                await this.usersRepo.create(record);
                const accessToken = this.tokens.getAuthToken(record.user.id);
                // Alternative way to authenticate a user is to set a cookie, which would then be
                // accessible on all requests. Here is a way to set a session cookie instead of passing
                // the token directly:
                // context.system.transport.response.setHeader('Set-Cookie', `auth-token=${accessToken}`)
                resolve(
                    new Right(
                        new SigninSuccessResponse({
                            user: record.user,
                            accessToken
                        })
                    )
                );
            } catch (err) {
                if (err instanceof RepoAlreadyExistsError) {
                    invokeAlreadyExistsError(AuthServiceSignupOutput, resolve, `User record already exists.`);
                } else {
                    invokeInternalError(AuthServiceSignupOutput, resolve, err);
                }
            }
        });
    }
      
    signin(context: ServiceContext, with_: SignIn): Promise<Either<AuthServiceSigninOutput, SigninResponse>> {
        return new Promise(async resolve => {
            try {
                const info = await with_.match<Promise<{
                    lookup: UserLookup,
                    pass?: string,
                    verified?: boolean,
                    twoFactor?: string
                }>>(
                    async whenEmail => ({
                        lookup: lookupFromEmail(whenEmail.email),
                        pass: whenEmail.pass
                    }),
                    async whenPhone => ({
                        lookup: lookupFromEmail(whenPhone.number_),
                        pass: whenPhone.pass
                    }),
                    async whenGoogle => {
                        const data = await this.verifyGoogle(whenGoogle.accessToken);
                        return {
                            lookup: lookupFromEmail(data.email),
                            verified: true
                        };
                    },
                    async whenGithub => {
                        const data = await this.verifyGithub(whenGithub.accessToken);
                        return {
                            lookup: lookupFromEmail(data.email),
                            verified: true
                        };
                    },
                    async whenFacebook => {
                        const data = await this.verifyFacebook(whenFacebook.accessToken);
                        return {
                            lookup: lookupFromEmail(data.email),
                            verified: true
                        };
                    },
                    async whenTwitter => {
                        const data = await this.verifyTwitter(whenTwitter.accessToken);
                        return {
                            lookup: lookupFromEmail(data.email),
                            verified: true
                        };
                    },
                    async whenTwoFactor => {
                        const mfaData = this.tokens.parseTwoFactorToken(whenTwoFactor.token);
                        if (!mfaData) {
                            throw new Error(`Invalid token for 2fa`);
                        }
                        return ({
                            lookup: UserLookup.fromUserID(mfaData),
                            verified: true,
                            twoFactor: whenTwoFactor.code
                        });
                    }
                );
                const data = await this.usersRepo.find(info.lookup);
                if (!data) {
                    invokeNotFoundError(AuthServiceSigninOutput, resolve, `User is not found or password is invalid`);
                    return;
                }

                // See if we need to check for password as details were not verified
                if (!info.twoFactor && !info.verified) {
                    // User signed up with a provider, has no password set
                    if (!data.passHash) {
                        invokeNotFoundError(AuthServiceSigninOutput, resolve, `Password is not enabled, use provider login or reset a password`);
                        return;
                    }

                    const hashed = hashPassword(info.pass || '', data.passSalt);
                    if (hashed !== data.passHash) {
                        invokeNotFoundError(AuthServiceSigninOutput, resolve, `User is not found or password is invalid`);
                        return;
                    }
                }
                if (data.mfaSecret) {
                    if (!info.twoFactor) {
                        resolve(
                            new Right(
                                SigninResponse.fromConfirm2FA(new SigninResponseConfirm2FA({
                                    message: `Please provide a code from app authenticator`,
                                    token: this.tokens.getTwoFactorToken(data.user.id)
                                }))
                            )
                        );
                        return;
                    }
                    const isCodeValid = this.tokens.mfaCheckAppAuthCode(data.mfaSecret, info.twoFactor);
                    if (!isCodeValid) {
                        invokeNotFoundError(AuthServiceSigninOutput, resolve, `Provided 2FA code is not valid or not found`);
                        return;
                    }
                }
                // User is legit, let's return authentication details
                resolve(
                    new Right(
                        SigninResponse.fromSigninSuccessResponse(new SigninSuccessResponse({
                            user: data.user,
                            accessToken: this.tokens.getAuthToken(data.user.id)
                        }))
                    )
                );
            } catch (err) {
                invokeInternalError(AuthServiceSigninOutput, resolve, err);
            }
        });
    }

    confirmEmail(context: ServiceContext, code: string): Promise<Either<AuthServiceConfirmEmailOutput, GenericSuccess>> {
        return new Promise(async resolve => {
            try {
                const email = this.tokens.parseEmailConfirmToken(code);
                if (!email) {
                    invokeNotFoundError(AuthServiceConfirmEmailOutput, resolve, `The code is not valid or has expired`);
                    return;
                }

                const data = await this.usersRepo.find(lookupFromEmail(email));
                const contact = data ? data.contacts.find(c => c.type === 'email' && c.email === sanitizeEmail(email)) : undefined;
                if (!data || !contact) {
                    invokeNotFoundError(AuthServiceConfirmEmailOutput, resolve, `Can't find a user with email ${email}`);
                    return;
                }
                contact.verified = true;
                await this.usersRepo.update(data);

                resolve(
                    new Right(new GenericSuccess({message: `We've sent you a reset message`}))
                );
            } catch (err) {
                invokeInternalError(AuthServiceConfirmEmailOutput, resolve, err);
            }
        });
    }
      
    confirmPhone(context: ServiceContext, code: string, phone: string): Promise<Either<AuthServiceConfirmPhoneOutput, GenericSuccess>> {
        return new Promise(async resolve => {
            try {
                const data = await this.usersRepo.find(lookupFromPhone(phone));
                const contact: PhoneContact | undefined = data ? data.contacts.find(c => c.type === 'phone' && c.phone === sanitizePhone(phone)) as PhoneContact : undefined;
                if (!data || !contact) {
                    invokeNotFoundError(AuthServiceConfirmPhoneOutput, resolve, `Can't find a user with phone ${phone}`);
                    return;
                }

                const valid = contact.code === code;
                if (!valid) {
                    invokeNotFoundError(AuthServiceConfirmPhoneOutput, resolve, `The code ${code} is not valid for ${phone}, try again`);
                    return;
                }

                contact.verified = true;
                await this.usersRepo.update(data);

                resolve(
                    new Right(new GenericSuccess({message: `We've sent you a reset message`}))
                );
            } catch (err) {
                invokeInternalError(AuthServiceConfirmPhoneOutput, resolve, err);
            }
        });
    }
      
    resetPassword(context: ServiceContext, lookup: UserLookup): Promise<Either<AuthServiceResetPasswordOutput, GenericSuccess>> {
        return new Promise(async resolve => {
            try {
                const data = await this.usersRepo.find(lookup);
                if (!data) {
                    invokeNotFoundError(AuthServiceResetPasswordOutput, resolve, `can't find a user ${lookup.toJSON()}`);
                    return;
                }
                // We assume there is always at least one contact
                const contact = data.contacts[0];
                const resetPasswordEndpoint = `${this.config.email.resetPassEndpoint}${this.tokens.getPassResetToken(data.user.id)}`;
                const resetPasswordMessage = `You've requested password reset. Please follow a link: ${resetPasswordEndpoint}`;
                if (contact.type === 'email') {
                    await sendEmail(contact.email, resetPasswordMessage);
                } else {
                    await sendSMS(contact.phone, resetPasswordMessage);
                }
                resolve(
                    new Right(new GenericSuccess({message: `We've sent you a reset message`}))
                );
            } catch (err) {
                invokeInternalError(AuthServiceResetPasswordOutput, resolve, err);
            }
        });
    }

    changePassword(context: ServiceContext, changeToken: string, password: string): Promise<Either<AuthServiceChangePasswordOutput, GenericSuccess>> {
        return new Promise(async resolve => {
            try {
                const tokenData = this.tokens.parsePassResetToken(changeToken);
                if (!tokenData) {
                    invokeNotFoundError(AuthServiceChangePasswordOutput, resolve, `Token is invalid`);
                    return;
                }
                const data = await this.usersRepo.find(UserLookup.fromUserID(tokenData));
                if (!data) {
                    invokeNotFoundError(AuthServiceChangePasswordOutput, resolve, `User is not valid`);
                    return;
                }
                data.passHash = hashPassword(password, data.passSalt);
                await this.usersRepo.update(data);
                resolve(new Right(new GenericSuccess()));
            } catch (err) {
                invokeInternalError(AuthServiceChangePasswordOutput, resolve, err);
            }
        });
    }
}
