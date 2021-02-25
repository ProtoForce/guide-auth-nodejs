// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceSigninOutput
} from './AuthServiceSigninOutput';
import {
  AuthServiceSigninOutputJSON
} from '../../codecs/authservice/models/AuthServiceSigninOutputJSON';
import {
  EitherJSON,
  Either,
  fromEitherJSON
} from '../../../../../../irt';
import {
  SigninResponse
} from '../../SigninResponse';
import {
  SigninResponseJSON
} from '../../codecs/SigninResponseJSON';

export class AuthServicesigninMethodOutputHelper {
  static toJSON(value: Either<AuthServiceSigninOutput, SigninResponse>): EitherJSON<AuthServiceSigninOutputJSON, SigninResponseJSON> {
    return value.toJSON(
      (r: SigninResponse): SigninResponseJSON => {
        return r.toJSON();
      },
      (l: AuthServiceSigninOutput): AuthServiceSigninOutputJSON => {
        return l.toJSON();
      }
    );
  }
  
  static fromJSON(value: EitherJSON<AuthServiceSigninOutputJSON, SigninResponseJSON>): Either<AuthServiceSigninOutput, SigninResponse> {
    return fromEitherJSON(
      value,
      (r: SigninResponseJSON): SigninResponse => {
        return SigninResponse.fromJSON(r);
      },
      (l: AuthServiceSigninOutputJSON): AuthServiceSigninOutput => {
        return AuthServiceSigninOutput.fromJSON(l);
      }
    )
  }
  
}