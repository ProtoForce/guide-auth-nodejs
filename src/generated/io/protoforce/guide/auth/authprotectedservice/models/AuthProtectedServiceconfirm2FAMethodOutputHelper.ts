// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceConfirm2FAOutput
} from './AuthProtectedServiceConfirm2FAOutput';
import {
  AuthProtectedServiceConfirm2FAOutputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceConfirm2FAOutputJSON';
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

export class AuthProtectedServiceconfirm2FAMethodOutputHelper {
  static toJSON(value: Either<AuthProtectedServiceConfirm2FAOutput, GenericSuccess>): EitherJSON<AuthProtectedServiceConfirm2FAOutputJSON, GenericSuccessJSON> {
    return value.toJSON(
      (r: GenericSuccess): GenericSuccessJSON => {
        return r.toJSON();
      },
      (l: AuthProtectedServiceConfirm2FAOutput): AuthProtectedServiceConfirm2FAOutputJSON => {
        return l.toJSON();
      }
    );
  }
  
  static fromJSON(value: EitherJSON<AuthProtectedServiceConfirm2FAOutputJSON, GenericSuccessJSON>): Either<AuthProtectedServiceConfirm2FAOutput, GenericSuccess> {
    return fromEitherJSON(
      value,
      (r: GenericSuccessJSON): GenericSuccess => {
        return GenericSuccess.fromJSON(r);
      },
      (l: AuthProtectedServiceConfirm2FAOutputJSON): AuthProtectedServiceConfirm2FAOutput => {
        return AuthProtectedServiceConfirm2FAOutput.fromJSON(l);
      }
    )
  }
  
}