// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice

import {
  AuthServiceChangePasswordOutput
} from './models/AuthServiceChangePasswordOutput';
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
  AuthServiceServer
} from './AuthServiceServer';
import {
  AuthServiceServerDispatcher
} from './AuthServiceServerDispatcher';
import {
  AuthServiceSigninOutput
} from './models/AuthServiceSigninOutput';
import {
  AuthServiceSignupOutput
} from './models/AuthServiceSignupOutput';
import {
  GenericSuccess
} from '../GenericSuccess';
import {
  ServiceDispatcher,
  Either,
  ServiceDispatcherAware
} from '../../../../../irt';
import {
  SignIn
} from '../SignIn';
import {
  SignUp
} from '../SignUp';
import {
  SigninResponse
} from '../SigninResponse';
import {
  SigninSuccessResponse
} from '../SigninSuccessResponse';
import {
  UserLookup
} from '../UserLookup';

export abstract class AuthServiceServerBase<C = void> implements ServiceDispatcherAware<C>, AuthServiceServer<C> {
  $dispatcher(): ServiceDispatcher<C> {
    return new AuthServiceServerDispatcher(this);
  }
  
  /**
    * 
    *  Sign up for a service with provided credentials
    * 
    * Defined at auth.service.pfm @ 72:3
    */
  signup(context: C, with_: SignUp): Either<AuthServiceSignupOutput, SigninSuccessResponse> | Promise<Either<AuthServiceSignupOutput, SigninSuccessResponse>> {
    throw new Error('signup method is not implemented.');
  }
  
  /**
    * 
    *  Sign in with provided credentials
    * 
    * Defined at auth.service.pfm @ 77:3
    */
  signin(context: C, with_: SignIn): Either<AuthServiceSigninOutput, SigninResponse> | Promise<Either<AuthServiceSigninOutput, SigninResponse>> {
    throw new Error('signin method is not implemented.');
  }
  
  /**
    * 
    *  Confirm email
    * 
    * Defined at auth.service.pfm @ 82:3
    */
  confirmEmail(context: C, code: string): Either<AuthServiceConfirmEmailOutput, GenericSuccess> | Promise<Either<AuthServiceConfirmEmailOutput, GenericSuccess>> {
    throw new Error('confirmEmail method is not implemented.');
  }
  
  /**
    * 
    *  Confirm phone number
    * 
    * Defined at auth.service.pfm @ 87:3
    */
  confirmPhone(context: C, code: string, phone: string): Either<AuthServiceConfirmPhoneOutput, GenericSuccess> | Promise<Either<AuthServiceConfirmPhoneOutput, GenericSuccess>> {
    throw new Error('confirmPhone method is not implemented.');
  }
  
  /**
    * 
    *  Reset password
    * 
    * Defined at auth.service.pfm @ 92:3
    */
  resetPassword(context: C, lookup: UserLookup): Either<AuthServiceResetPasswordOutput, GenericSuccess> | Promise<Either<AuthServiceResetPasswordOutput, GenericSuccess>> {
    throw new Error('resetPassword method is not implemented.');
  }
  
  /**
    * 
    *  Change password
    * 
    * Defined at auth.service.pfm @ 97:3
    */
  changePassword(context: C, changeToken: string, password: string): Either<AuthServiceChangePasswordOutput, GenericSuccess> | Promise<Either<AuthServiceChangePasswordOutput, GenericSuccess>> {
    throw new Error('changePassword method is not implemented.');
  }
  
}