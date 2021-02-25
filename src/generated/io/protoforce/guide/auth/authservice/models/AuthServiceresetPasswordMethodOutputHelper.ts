// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceResetPasswordOutput
} from './AuthServiceResetPasswordOutput';
import {
  AuthServiceResetPasswordOutputJSON
} from '../../codecs/authservice/models/AuthServiceResetPasswordOutputJSON';
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

export class AuthServiceresetPasswordMethodOutputHelper {
  static toJSON(value: Either<AuthServiceResetPasswordOutput, GenericSuccess>): EitherJSON<AuthServiceResetPasswordOutputJSON, GenericSuccessJSON> {
    return value.toJSON(
      (r: GenericSuccess): GenericSuccessJSON => {
        return r.toJSON();
      },
      (l: AuthServiceResetPasswordOutput): AuthServiceResetPasswordOutputJSON => {
        return l.toJSON();
      }
    );
  }
  
  static fromJSON(value: EitherJSON<AuthServiceResetPasswordOutputJSON, GenericSuccessJSON>): Either<AuthServiceResetPasswordOutput, GenericSuccess> {
    return fromEitherJSON(
      value,
      (r: GenericSuccessJSON): GenericSuccess => {
        return GenericSuccess.fromJSON(r);
      },
      (l: AuthServiceResetPasswordOutputJSON): AuthServiceResetPasswordOutput => {
        return AuthServiceResetPasswordOutput.fromJSON(l);
      }
    )
  }
  
}