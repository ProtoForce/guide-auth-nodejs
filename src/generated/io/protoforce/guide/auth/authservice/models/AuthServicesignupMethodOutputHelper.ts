// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceSignupOutput
} from './AuthServiceSignupOutput';
import {
  AuthServiceSignupOutputJSON
} from '../../codecs/authservice/models/AuthServiceSignupOutputJSON';
import {
  EitherJSON,
  Either,
  fromEitherJSON
} from '../../../../../../irt';
import {
  SigninSuccessResponse
} from '../../SigninSuccessResponse';
import {
  SigninSuccessResponseJSON
} from '../../codecs/SigninSuccessResponseJSON';

export class AuthServicesignupMethodOutputHelper {
  static toJSON(value: Either<AuthServiceSignupOutput, SigninSuccessResponse>): EitherJSON<AuthServiceSignupOutputJSON, SigninSuccessResponseJSON> {
    return value.toJSON(
      (r: SigninSuccessResponse): SigninSuccessResponseJSON => {
        return r.toJSON();
      },
      (l: AuthServiceSignupOutput): AuthServiceSignupOutputJSON => {
        return l.toJSON();
      }
    );
  }
  
  static fromJSON(value: EitherJSON<AuthServiceSignupOutputJSON, SigninSuccessResponseJSON>): Either<AuthServiceSignupOutput, SigninSuccessResponse> {
    return fromEitherJSON(
      value,
      (r: SigninSuccessResponseJSON): SigninSuccessResponse => {
        return SigninSuccessResponse.fromJSON(r);
      },
      (l: AuthServiceSignupOutputJSON): AuthServiceSignupOutput => {
        return AuthServiceSignupOutput.fromJSON(l);
      }
    )
  }
  
}