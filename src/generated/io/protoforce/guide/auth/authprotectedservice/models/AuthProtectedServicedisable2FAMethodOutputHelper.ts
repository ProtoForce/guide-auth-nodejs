// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceDisable2FAOutput
} from './AuthProtectedServiceDisable2FAOutput';
import {
  AuthProtectedServiceDisable2FAOutputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceDisable2FAOutputJSON';
import {
  EitherJSON,
  Either,
  fromEitherJSON
} from '../../../../../../irt';
import {
  GenericSuccess
} from '../../GenericSuccess';
import {
  GenericSuccessJSON
} from '../../codecs/GenericSuccessJSON';

export class AuthProtectedServicedisable2FAMethodOutputHelper {
  static toJSON(value: Either<AuthProtectedServiceDisable2FAOutput, GenericSuccess>): EitherJSON<AuthProtectedServiceDisable2FAOutputJSON, GenericSuccessJSON> {
    return value.toJSON(
      (r: GenericSuccess): GenericSuccessJSON => {
        return r.toJSON();
      },
      (l: AuthProtectedServiceDisable2FAOutput): AuthProtectedServiceDisable2FAOutputJSON => {
        return l.toJSON();
      }
    );
  }
  
  static fromJSON(value: EitherJSON<AuthProtectedServiceDisable2FAOutputJSON, GenericSuccessJSON>): Either<AuthProtectedServiceDisable2FAOutput, GenericSuccess> {
    return fromEitherJSON(
      value,
      (r: GenericSuccessJSON): GenericSuccess => {
        return GenericSuccess.fromJSON(r);
      },
      (l: AuthProtectedServiceDisable2FAOutputJSON): AuthProtectedServiceDisable2FAOutput => {
        return AuthProtectedServiceDisable2FAOutput.fromJSON(l);
      }
    )
  }
  
}