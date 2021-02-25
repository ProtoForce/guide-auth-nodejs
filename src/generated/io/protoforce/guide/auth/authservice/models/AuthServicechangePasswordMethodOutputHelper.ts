// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceChangePasswordOutput
} from './AuthServiceChangePasswordOutput';
import {
  AuthServiceChangePasswordOutputJSON
} from '../../codecs/authservice/models/AuthServiceChangePasswordOutputJSON';
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

export class AuthServicechangePasswordMethodOutputHelper {
  static toJSON(value: Either<AuthServiceChangePasswordOutput, GenericSuccess>): EitherJSON<AuthServiceChangePasswordOutputJSON, GenericSuccessJSON> {
    return value.toJSON(
      (r: GenericSuccess): GenericSuccessJSON => {
        return r.toJSON();
      },
      (l: AuthServiceChangePasswordOutput): AuthServiceChangePasswordOutputJSON => {
        return l.toJSON();
      }
    );
  }
  
  static fromJSON(value: EitherJSON<AuthServiceChangePasswordOutputJSON, GenericSuccessJSON>): Either<AuthServiceChangePasswordOutput, GenericSuccess> {
    return fromEitherJSON(
      value,
      (r: GenericSuccessJSON): GenericSuccess => {
        return GenericSuccess.fromJSON(r);
      },
      (l: AuthServiceChangePasswordOutputJSON): AuthServiceChangePasswordOutput => {
        return AuthServiceChangePasswordOutput.fromJSON(l);
      }
    )
  }
  
}