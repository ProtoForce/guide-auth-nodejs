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
  AuthServiceSigninOutput
} from './models/AuthServiceSigninOutput';
import {
  AuthServiceSignupOutput
} from './models/AuthServiceSignupOutput';
import {
  Either
} from '../../../../../irt';
import {
  GenericSuccess
} from '../GenericSuccess';
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

/**
  * 
  *  Authentication service
  * 
  * Service io.protoforce.guide.auth.authservice:AuthService
  * 
  * Defined at auth.service.pfm @ 67:1
  */
export interface AuthServiceServer<C = void> {
  /**
    * 
    *  Sign up for a service with provided credentials
    * 
    * Defined at auth.service.pfm @ 72:3
    */
  signup(context: C, with_: SignUp): Either<AuthServiceSignupOutput, SigninSuccessResponse> | Promise<Either<AuthServiceSignupOutput, SigninSuccessResponse>>;
  /**
    * 
    *  Sign in with provided credentials
    * 
    * Defined at auth.service.pfm @ 77:3
    */
  signin(context: C, with_: SignIn): Either<AuthServiceSigninOutput, SigninResponse> | Promise<Either<AuthServiceSigninOutput, SigninResponse>>;
  /**
    * 
    *  Confirm email
    * 
    * Defined at auth.service.pfm @ 82:3
    */
  confirmEmail(context: C, code: string): Either<AuthServiceConfirmEmailOutput, GenericSuccess> | Promise<Either<AuthServiceConfirmEmailOutput, GenericSuccess>>;
  /**
    * 
    *  Confirm phone number
    * 
    * Defined at auth.service.pfm @ 87:3
    */
  confirmPhone(context: C, code: string, phone: string): Either<AuthServiceConfirmPhoneOutput, GenericSuccess> | Promise<Either<AuthServiceConfirmPhoneOutput, GenericSuccess>>;
  /**
    * 
    *  Reset password
    * 
    * Defined at auth.service.pfm @ 92:3
    */
  resetPassword(context: C, lookup: UserLookup): Either<AuthServiceResetPasswordOutput, GenericSuccess> | Promise<Either<AuthServiceResetPasswordOutput, GenericSuccess>>;
  /**
    * 
    *  Change password
    * 
    * Defined at auth.service.pfm @ 97:3
    */
  changePassword(context: C, changeToken: string, password: string): Either<AuthServiceChangePasswordOutput, GenericSuccess> | Promise<Either<AuthServiceChangePasswordOutput, GenericSuccess>>;
}