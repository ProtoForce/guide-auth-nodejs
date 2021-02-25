// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceAddIdentityOutput
} from './AuthProtectedServiceAddIdentityOutput';
import {
  AuthProtectedServiceAddIdentityOutputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceAddIdentityOutputJSON';
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

export class AuthProtectedServiceaddIdentityMethodOutputHelper {
  static toJSON(value: Either<AuthProtectedServiceAddIdentityOutput, GenericSuccess>): EitherJSON<AuthProtectedServiceAddIdentityOutputJSON, GenericSuccessJSON> {
    return value.toJSON(
      (r: GenericSuccess): GenericSuccessJSON => {
        return r.toJSON();
      },
      (l: AuthProtectedServiceAddIdentityOutput): AuthProtectedServiceAddIdentityOutputJSON => {
        return l.toJSON();
      }
    );
  }
  
  static fromJSON(value: EitherJSON<AuthProtectedServiceAddIdentityOutputJSON, GenericSuccessJSON>): Either<AuthProtectedServiceAddIdentityOutput, GenericSuccess> {
    return fromEitherJSON(
      value,
      (r: GenericSuccessJSON): GenericSuccess => {
        return GenericSuccess.fromJSON(r);
      },
      (l: AuthProtectedServiceAddIdentityOutputJSON): AuthProtectedServiceAddIdentityOutput => {
        return AuthProtectedServiceAddIdentityOutput.fromJSON(l);
      }
    )
  }
  
}