import {
    Either,
    Logger,
    LogLevel,
    Right
} from '@auth/irt';
import {
    AuthProtectedServiceAddIdentityOutput,
    AuthProtectedServiceConfirm2FAOutput,
    AuthProtectedServiceDisable2FAOutput,
    AuthProtectedServiceListIdentitiesOutput,
    AuthProtectedServiceRemoveIdentityOutput,
    AuthProtectedServiceRequest2FAOutput,
    AuthProtectedServiceServerBase,
    GenericSuccess,
    KnownIdentities,
    MFAMethodConfirm,
    MFAMethodPending,
    MFAMethodPendingApp,
    MFAMethodRequest,
    SecondaryIdentity, 
    SecondaryIdentityEmail, 
    SecondaryIdentityPhone, 
    UserLookup,
    ServerConfig
 } from '@auth/service';

import { ServiceContext } from './context';
import { invokeInternalError, isAuthorized, invokeNotFoundError, invokeForbiddenError } from './errors';
import { Tokens } from './tokens';
import { UsersRepo } from './users.repo';
import { generatePhoneCode, sanitizeEmail, sanitizePhone, sendEmail, sendSMS } from './utils';

export class AuthProtecedServiceImpl extends AuthProtectedServiceServerBase<ServiceContext> {
    private logger: Logger;
    private usersRepo: UsersRepo;
    private tokens: Tokens;
    private config: ServerConfig;

    constructor(logger: Logger, usersRepo: UsersRepo, tokens: Tokens, config: ServerConfig) {
        super();
        this.logger = logger;
        this.logger.logf(LogLevel.Info, 'Created AuthProtectedService');
        this.usersRepo = usersRepo;
        this.tokens = tokens;
        this.config = config;
    }

    request2FA(context: ServiceContext, method: MFAMethodRequest): Promise<Either<AuthProtectedServiceRequest2FAOutput, MFAMethodPending>> {
        return new Promise(async resolve => {
            if (!isAuthorized(context, AuthProtectedServiceRequest2FAOutput, resolve)) {
                return;
            }
            try {
                const data = await this.usersRepo.find(UserLookup.fromUserID(context.user!.userID!));
                if (!data) {
                    throw new Error(`User is not found, inconsistent state`);
                }
                if (data.mfaSecret) {
                    invokeForbiddenError(AuthProtectedServiceRequest2FAOutput, resolve, `Inconsistent state, the user has 2FA already enabled`);
                    return;
                }
                const pending: MFAMethodPending = method.match(
                    whenApp => {
                        const secret = this.tokens.mfaGenerateAppAuthSecret();
                        // When it is an app, we generate a secret and then use it
                        return MFAMethodPending.fromApp(new MFAMethodPendingApp({
                            secret,
                            token: this.tokens.mfaGetSignedSecretToken(secret)
                        }));
                    }
                );
                resolve(
                    new Right(pending)
                );
            } catch (err) {
                invokeInternalError(AuthProtectedServiceRequest2FAOutput, resolve, err);
            }
        });
    }
    
    confirm2FA(context: ServiceContext, method: MFAMethodConfirm): Promise<Either<AuthProtectedServiceConfirm2FAOutput, GenericSuccess>> {
        return new Promise(async resolve => {
            if (!isAuthorized(context, AuthProtectedServiceConfirm2FAOutput, resolve)) {
                return;
            }
            try {
                const data = await this.usersRepo.find(UserLookup.fromUserID(context.user!.userID!));
                if (!data) {
                    throw new Error(`User is not found, inconsistent state`);
                }
                if (data.mfaSecret) {
                    invokeForbiddenError(AuthProtectedServiceRequest2FAOutput, resolve, `Inconsistent state, the user has 2FA already enabled`);
                    return;
                }
                await method.match(
                    async whenApp => {
                        const secret = this.tokens.mfaParseSignedSecretToken(whenApp.token);
                        if (!secret) {
                            invokeForbiddenError(AuthProtectedServiceRequest2FAOutput, resolve, `2FA token is invalid`);
                            return;
                        }
                        if (!this.tokens.mfaCheckAppAuthCode(secret, whenApp.code)) {
                            invokeForbiddenError(AuthProtectedServiceRequest2FAOutput, resolve, `Code ${whenApp.code} is not valid`);
                            return;
                        }
                        data.mfaSecret = secret;
                        await this.usersRepo.update(data);
                        resolve(new Right(new GenericSuccess({message: `2FA has been enabled`})));
                    }
                );
            } catch (err) {
                invokeInternalError(AuthProtectedServiceConfirm2FAOutput, resolve, err);
            }
        });
    }
    
    disable2FA(context: ServiceContext): Promise<Either<AuthProtectedServiceDisable2FAOutput, GenericSuccess>> {
        return new Promise(async resolve => {
            if (!isAuthorized(context, AuthProtectedServiceDisable2FAOutput, resolve)) {
                return;
            }
            try {
                const data = await this.usersRepo.find(UserLookup.fromUserID(context.user!.userID!));
                if (!data) {
                    throw new Error(`User is not found, inconsistent state`);
                }
                if (!data.mfaSecret) {
                    invokeForbiddenError(AuthProtectedServiceRequest2FAOutput, resolve, `Inconsistent state, the user has no 2FA enabled`);
                    return;
                }
                data.mfaSecret = undefined;
                await this.usersRepo.update(data);
                resolve(new Right(new GenericSuccess({message: `2FA has been disabled`})));
            } catch (err) {
                invokeInternalError(AuthProtectedServiceDisable2FAOutput, resolve, err);
            }
        });
    }
    
    addIdentity(context: ServiceContext, identity: SecondaryIdentity): Promise<Either<AuthProtectedServiceAddIdentityOutput, GenericSuccess>> {
        return new Promise(async resolve => {
            if (!isAuthorized(context, AuthProtectedServiceAddIdentityOutput, resolve)) {
                return;
            }
            try {
                const userID = context.user!.userID!;
                const user = await this.usersRepo.find(UserLookup.fromUserID(userID));
                if (!user) {
                    throw new Error(`Inconsistent scenario, user ID ${userID.id} is valid but not found in the DB`);
                }
                await identity.match(
                    async whenPhone => {
                        // Generate six digit code
                        const code = generatePhoneCode();
                        const sanitized = sanitizePhone(whenPhone.phone);
                        user.contacts.push({
                            type: 'phone',
                            original: whenPhone.phone,
                            phone: sanitized,
                            verified: false,
                            // Here we just hardcode it, but it has to be added dynamically and have expiration set
                            // on it so that it can't be bruteforced
                            code
                        });
                        await this.usersRepo.update(user);
                        sendSMS(sanitized, `Your phone verification code is ${code}`);
                    },
                    async whenEmail => {
                        const sanitized = sanitizeEmail(whenEmail.email);
                        user.contacts.push({
                            type: 'email',
                            original: whenEmail.email,
                            email: sanitized,
                            verified: false
                        });
                        await this.usersRepo.update(user);
                        sendEmail(sanitized, `Please verify your email by clicking here: ${this.config.email.confirmEndpoint}${this.tokens.getEmailConfirmToken(whenEmail.email)}`);
                    }
                );
                resolve(new Right(new GenericSuccess()));
            } catch (err) {
                invokeInternalError(AuthProtectedServiceAddIdentityOutput, resolve, err);
            }
        });
    }
    
    removeIdentity(context: ServiceContext, identity: SecondaryIdentity): Promise<Either<AuthProtectedServiceRemoveIdentityOutput, GenericSuccess>> {
        return new Promise(async resolve => {
            if (!isAuthorized(context, AuthProtectedServiceRemoveIdentityOutput, resolve)) {
                return;
            }
            try {
                const userID = context.user!.userID!;
                const user = await this.usersRepo.find(UserLookup.fromUserID(userID));
                if (!user) {
                    throw new Error(`Inconsistent scenario, user ID ${userID.id} is valid but not found in the DB`);
                }
                const ci = user.contacts.findIndex(c => identity.match(
                    whenPhone => c.type === 'phone' && c.phone === sanitizePhone(whenPhone.phone),
                    whenEmail => c.type === 'email' && c.email === sanitizeEmail(whenEmail.email),
                ));
                if (ci < 0) {
                    invokeNotFoundError(AuthProtectedServiceRemoveIdentityOutput, resolve, `No contact is found`);
                    return;
                }
                user.contacts.splice(ci, 1);
                await this.usersRepo.update(user);
                resolve(new Right(new GenericSuccess()));
            } catch (err) {
                invokeInternalError(AuthProtectedServiceRemoveIdentityOutput, resolve, err);
            }
        });
    }
    
    listIdentities(context: ServiceContext): Promise<Either<AuthProtectedServiceListIdentitiesOutput, KnownIdentities>> {
        return new Promise(async resolve => {
            if (!isAuthorized(context, AuthProtectedServiceListIdentitiesOutput, resolve)) {
                return;
            }
            try {
                const userID = context.user!.userID!;
                const user = await this.usersRepo.find(UserLookup.fromUserID(userID));
                if (!user) {
                    throw new Error(`Inconsistent scenario, user ID ${userID.id} is valid but not found in the DB`);
                }
                const mapped = user.contacts.map(c => ({
                    identity: c.type === 'email' ?
                        SecondaryIdentity.fromEmail(new SecondaryIdentityEmail({email: c.original})) :
                        SecondaryIdentity.fromPhone(new SecondaryIdentityPhone({phone: c.original})),
                    verified: c.verified
                }));
                resolve(
                    new Right(
                        new KnownIdentities({
                            confirmed: mapped.filter(c => c.verified).map(c => c.identity),
                            unconfirmed: mapped.filter(c => c.verified).map(c => c.identity)
                        })
                    )
                );
            } catch (err) {
                invokeInternalError(AuthProtectedServiceListIdentitiesOutput, resolve, err);
            }
        });
    }
}
