// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice

import {
  AuthServiceChangePasswordOutput
} from './models/AuthServiceChangePasswordOutput';
import {
  AuthServiceClientDefn
} from './AuthServiceClientDefn';
import {
  AuthServiceConfirmEmailOutput
} from './models/AuthServiceConfirmEmailOutput';
import {
  AuthServiceConfirmPhoneOutput
} from './models/AuthServiceConfirmPhoneOutput';
import {
  AuthServiceResetPasswordOutput
} from './models/AuthServiceResetPasswordOutput';
import {
  AuthServiceSigninOutput
} from './models/AuthServiceSigninOutput';
import {
  AuthServiceSignupOutput
} from './models/AuthServiceSignupOutput';
import {
  ClientTransport,
  HTTPClientTransportOptions,
  HTTPClientTransport,
  PromiseEx,
  Either,
  WithRTTI
} from '../../../../../irt';
import {
  GenericSuccess
} from '../GenericSuccess';
import {
  SignIn
} from '../SignIn';
import {
  SignInTypes
} from '../SignInTypes';
import {
  SignUp
} from '../SignUp';
import {
  SignUpTypes
} from '../SignUpTypes';
import {
  SigninResponse
} from '../SigninResponse';
import {
  SigninSuccessResponse
} from '../SigninSuccessResponse';
import {
  UserLookup
} from '../UserLookup';
import {
  UserLookupTypes
} from '../UserLookupTypes';
import {
  authServiceChangePassword
} from './methods/authServiceChangePassword';
import {
  authServiceConfirmEmail
} from './methods/authServiceConfirmEmail';
import {
  authServiceConfirmPhone
} from './methods/authServiceConfirmPhone';
import {
  authServiceRTTI
} from './methods/authServiceRTTI';
import {
  authServiceResetPassword
} from './methods/authServiceResetPassword';
import {
  authServiceSignin
} from './methods/authServiceSignin';
import {
  authServiceSignup
} from './methods/authServiceSignup';

export class AuthServiceClient<C = void> implements AuthServiceClientDefn<C>, WithRTTI {
  private transport: ClientTransport<C>;
  static readonly RTTI_CLASS: string = authServiceRTTI.RTTI_CLASS;
  static readonly RTTI_FQN: string = authServiceRTTI.RTTI_FQN;
  
  get RTTI_CLASS(): string {
    return AuthServiceClient.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthServiceClient.RTTI_FQN;
  }
  
  constructor(transport: ClientTransport<C>) {
    this.transport = transport;
  }
  
  static fromHTTP<C = void>(endpoint: string, options?: Partial<HTTPClientTransportOptions> | undefined): AuthServiceClient<C> {
    return new AuthServiceClient<C>(
      new HTTPClientTransport(endpoint, options)
    );
  }
  
  /**
    * 
    *  Sign up for a service with provided credentials
    * 
    * Defined at auth.service.pfm @ 72:3
    */
  signup(with_: SignUpTypes | SignUp, _context?: C | undefined): PromiseEx<Either<AuthServiceSignupOutput, SigninSuccessResponse>> {
    return authServiceSignup({with_}, this.transport, _context);
  }
  
  /**
    * 
    *  Sign in with provided credentials
    * 
    * Defined at auth.service.pfm @ 77:3
    */
  signin(with_: SignInTypes | SignIn, _context?: C | undefined): PromiseEx<Either<AuthServiceSigninOutput, SigninResponse>> {
    return authServiceSignin({with_}, this.transport, _context);
  }
  
  /**
    * 
    *  Confirm email
    * 
    * Defined at auth.service.pfm @ 82:3
    */
  confirmEmail(code: string, _context?: C | undefined): PromiseEx<Either<AuthServiceConfirmEmailOutput, GenericSuccess>> {
    return authServiceConfirmEmail({code}, this.transport, _context);
  }
  
  /**
    * 
    *  Confirm phone number
    * 
    * Defined at auth.service.pfm @ 87:3
    */
  confirmPhone(code: string, phone: string, _context?: C | undefined): PromiseEx<Either<AuthServiceConfirmPhoneOutput, GenericSuccess>> {
    return authServiceConfirmPhone({code, phone}, this.transport, _context);
  }
  
  /**
    * 
    *  Reset password
    * 
    * Defined at auth.service.pfm @ 92:3
    */
  resetPassword(lookup: UserLookupTypes | UserLookup, _context?: C | undefined): PromiseEx<Either<AuthServiceResetPasswordOutput, GenericSuccess>> {
    return authServiceResetPassword({lookup}, this.transport, _context);
  }
  
  /**
    * 
    *  Change password
    * 
    * Defined at auth.service.pfm @ 97:3
    */
  changePassword(changeToken: string, password: string, _context?: C | undefined): PromiseEx<Either<AuthServiceChangePasswordOutput, GenericSuccess>> {
    return authServiceChangePassword({changeToken, password}, this.transport, _context);
  }
  
}