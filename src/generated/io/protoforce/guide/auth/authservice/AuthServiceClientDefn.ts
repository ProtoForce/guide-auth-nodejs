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
  GenericSuccess
} from '../GenericSuccess';
import {
  PromiseEx,
  Either
} from '../../../../../irt';
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

/**
  * 
  *  Authentication service
  * 
  * Service io.protoforce.guide.auth.authservice:AuthService
  * 
  * Defined at auth.service.pfm @ 67:1
  */
export interface AuthServiceClientDefn<C = void> {
  /**
    * 
    *  Sign up for a service with provided credentials
    * 
    * Defined at auth.service.pfm @ 72:3
    */
  signup(with_: SignUpTypes | SignUp, _context?: C | undefined): PromiseEx<Either<AuthServiceSignupOutput, SigninSuccessResponse>>;
  /**
    * 
    *  Sign in with provided credentials
    * 
    * Defined at auth.service.pfm @ 77:3
    */
  signin(with_: SignInTypes | SignIn, _context?: C | undefined): PromiseEx<Either<AuthServiceSigninOutput, SigninResponse>>;
  /**
    * 
    *  Confirm email
    * 
    * Defined at auth.service.pfm @ 82:3
    */
  confirmEmail(code: string, _context?: C | undefined): PromiseEx<Either<AuthServiceConfirmEmailOutput, GenericSuccess>>;
  /**
    * 
    *  Confirm phone number
    * 
    * Defined at auth.service.pfm @ 87:3
    */
  confirmPhone(code: string, phone: string, _context?: C | undefined): PromiseEx<Either<AuthServiceConfirmPhoneOutput, GenericSuccess>>;
  /**
    * 
    *  Reset password
    * 
    * Defined at auth.service.pfm @ 92:3
    */
  resetPassword(lookup: UserLookupTypes | UserLookup, _context?: C | undefined): PromiseEx<Either<AuthServiceResetPasswordOutput, GenericSuccess>>;
  /**
    * 
    *  Change password
    * 
    * Defined at auth.service.pfm @ 97:3
    */
  changePassword(changeToken: string, password: string, _context?: C | undefined): PromiseEx<Either<AuthServiceChangePasswordOutput, GenericSuccess>>;
}