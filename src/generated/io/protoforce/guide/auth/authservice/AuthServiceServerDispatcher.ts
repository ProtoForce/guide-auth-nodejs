// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice

import {
  AuthServiceChangePasswordInput
} from './models/AuthServiceChangePasswordInput';
import {
  AuthServiceChangePasswordOutput
} from './models/AuthServiceChangePasswordOutput';
import {
  AuthServiceConfirmEmailInput
} from './models/AuthServiceConfirmEmailInput';
import {
  AuthServiceConfirmEmailOutput
} from './models/AuthServiceConfirmEmailOutput';
import {
  AuthServiceConfirmPhoneInput
} from './models/AuthServiceConfirmPhoneInput';
import {
  AuthServiceConfirmPhoneOutput
} from './models/AuthServiceConfirmPhoneOutput';
import {
  AuthServiceResetPasswordInput
} from './models/AuthServiceResetPasswordInput';
import {
  AuthServiceResetPasswordOutput
} from './models/AuthServiceResetPasswordOutput';
import {
  AuthServiceServer
} from './AuthServiceServer';
import {
  AuthServiceSigninInput
} from './models/AuthServiceSigninInput';
import {
  AuthServiceSigninOutput
} from './models/AuthServiceSigninOutput';
import {
  AuthServiceSignupInput
} from './models/AuthServiceSignupInput';
import {
  AuthServiceSignupOutput
} from './models/AuthServiceSignupOutput';
import {
  AuthServicechangePasswordMethodOutputHelper
} from './models/AuthServicechangePasswordMethodOutputHelper';
import {
  AuthServiceconfirmEmailMethodOutputHelper
} from './models/AuthServiceconfirmEmailMethodOutputHelper';
import {
  AuthServiceconfirmPhoneMethodOutputHelper
} from './models/AuthServiceconfirmPhoneMethodOutputHelper';
import {
  AuthServiceresetPasswordMethodOutputHelper
} from './models/AuthServiceresetPasswordMethodOutputHelper';
import {
  AuthServicesigninMethodOutputHelper
} from './models/AuthServicesigninMethodOutputHelper';
import {
  AuthServicesignupMethodOutputHelper
} from './models/AuthServicesignupMethodOutputHelper';
import {
  GenericSuccess
} from '../GenericSuccess';
import {
  ServiceDispatcherMethods,
  InvalidParamsError,
  Either,
  WithRTTI,
  ServiceDispatcher
} from '../../../../../irt';
import {
  SigninResponse
} from '../SigninResponse';
import {
  SigninSuccessResponse
} from '../SigninSuccessResponse';

export class AuthServiceServerDispatcher<C = void> implements WithRTTI, ServiceDispatcher<C> {
  private server: AuthServiceServer<C>;
  static readonly RTTI_CLASS: string = 'AuthService';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authservice:AuthService';
  
  constructor(server: AuthServiceServer<C>) {
    this.server = server;
  }
  
  get methods(): ServiceDispatcherMethods {
    return {
      'signup': {
        in: AuthServiceSignupInput,
        out: AuthServicesignupMethodOutputHelper,
        alternative: true
      },
      'signin': {
        in: AuthServiceSigninInput,
        out: AuthServicesigninMethodOutputHelper,
        alternative: true
      },
      'confirmEmail': {
        in: AuthServiceConfirmEmailInput,
        out: AuthServiceconfirmEmailMethodOutputHelper,
        alternative: true
      },
      'confirmPhone': {
        in: AuthServiceConfirmPhoneInput,
        out: AuthServiceconfirmPhoneMethodOutputHelper,
        alternative: true
      },
      'resetPassword': {
        in: AuthServiceResetPasswordInput,
        out: AuthServiceresetPasswordMethodOutputHelper,
        alternative: true
      },
      'changePassword': {
        in: AuthServiceChangePasswordInput,
        out: AuthServicechangePasswordMethodOutputHelper,
        alternative: true
      }
    };
  }
  
  dispatch(context: C, method: string, data?: unknown | undefined) {
    switch (method) {
      case 'signup': {
        return new Promise((resolve, reject) => {
          try {
            if (!(data instanceof AuthServiceSignupInput)) {
              throw new InvalidParamsError(`AuthService.signup dispatch data must be of AuthServiceSignupInput type`);
            }
            const outgoing = this.server.signup(
              context,
              data.with_
            );
            Promise.resolve(outgoing).then(
              (r: Either<AuthServiceSignupOutput, SigninSuccessResponse>) => resolve(r),
              (err) => reject(err)
            );
          } catch (err) {
            reject(err)
          }
        });
      }
             
      case 'signin': {
        return new Promise((resolve, reject) => {
          try {
            if (!(data instanceof AuthServiceSigninInput)) {
              throw new InvalidParamsError(`AuthService.signin dispatch data must be of AuthServiceSigninInput type`);
            }
            const outgoing = this.server.signin(
              context,
              data.with_
            );
            Promise.resolve(outgoing).then(
              (r: Either<AuthServiceSigninOutput, SigninResponse>) => resolve(r),
              (err) => reject(err)
            );
          } catch (err) {
            reject(err)
          }
        });
      }
             
      case 'confirmEmail': {
        return new Promise((resolve, reject) => {
          try {
            if (!(data instanceof AuthServiceConfirmEmailInput)) {
              throw new InvalidParamsError(`AuthService.confirmEmail dispatch data must be of AuthServiceConfirmEmailInput type`);
            }
            const outgoing = this.server.confirmEmail(
              context,
              data.code
            );
            Promise.resolve(outgoing).then(
              (r: Either<AuthServiceConfirmEmailOutput, GenericSuccess>) => resolve(r),
              (err) => reject(err)
            );
          } catch (err) {
            reject(err)
          }
        });
      }
             
      case 'confirmPhone': {
        return new Promise((resolve, reject) => {
          try {
            if (!(data instanceof AuthServiceConfirmPhoneInput)) {
              throw new InvalidParamsError(`AuthService.confirmPhone dispatch data must be of AuthServiceConfirmPhoneInput type`);
            }
            const outgoing = this.server.confirmPhone(
              context,
              data.code,
              data.phone
            );
            Promise.resolve(outgoing).then(
              (r: Either<AuthServiceConfirmPhoneOutput, GenericSuccess>) => resolve(r),
              (err) => reject(err)
            );
          } catch (err) {
            reject(err)
          }
        });
      }
             
      case 'resetPassword': {
        return new Promise((resolve, reject) => {
          try {
            if (!(data instanceof AuthServiceResetPasswordInput)) {
              throw new InvalidParamsError(`AuthService.resetPassword dispatch data must be of AuthServiceResetPasswordInput type`);
            }
            const outgoing = this.server.resetPassword(
              context,
              data.lookup
            );
            Promise.resolve(outgoing).then(
              (r: Either<AuthServiceResetPasswordOutput, GenericSuccess>) => resolve(r),
              (err) => reject(err)
            );
          } catch (err) {
            reject(err)
          }
        });
      }
             
      case 'changePassword': {
        return new Promise((resolve, reject) => {
          try {
            if (!(data instanceof AuthServiceChangePasswordInput)) {
              throw new InvalidParamsError(`AuthService.changePassword dispatch data must be of AuthServiceChangePasswordInput type`);
            }
            const outgoing = this.server.changePassword(
              context,
              data.changeToken,
              data.password
            );
            Promise.resolve(outgoing).then(
              (r: Either<AuthServiceChangePasswordOutput, GenericSuccess>) => resolve(r),
              (err) => reject(err)
            );
          } catch (err) {
            reject(err)
          }
        });
      }
             
      default: throw new Error(`Unsupported method '${method}' requested from a dispatcher.`);
    }
  }
  
  get RTTI_CLASS(): string {
    return AuthServiceServerDispatcher.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthServiceServerDispatcher.RTTI_FQN;
  }
  
}