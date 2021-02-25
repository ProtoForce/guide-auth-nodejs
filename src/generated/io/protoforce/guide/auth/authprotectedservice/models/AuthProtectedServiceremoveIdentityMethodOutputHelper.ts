// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceRemoveIdentityOutput
} from './AuthProtectedServiceRemoveIdentityOutput';
import {
  AuthProtectedServiceRemoveIdentityOutputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceRemoveIdentityOutputJSON';
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

export class AuthProtectedServiceremoveIdentityMethodOutputHelper {
  static toJSON(value: Either<AuthProtectedServiceRemoveIdentityOutput, GenericSuccess>): EitherJSON<AuthProtectedServiceRemoveIdentityOutputJSON, GenericSuccessJSON> {
    return value.toJSON(
      (r: GenericSuccess): GenericSuccessJSON => {
        return r.toJSON();
      },
      (l: AuthProtectedServiceRemoveIdentityOutput): AuthProtectedServiceRemoveIdentityOutputJSON => {
        return l.toJSON();
      }
    );
  }
  
  static fromJSON(value: EitherJSON<AuthProtectedServiceRemoveIdentityOutputJSON, GenericSuccessJSON>): Either<AuthProtectedServiceRemoveIdentityOutput, GenericSuccess> {
    return fromEitherJSON(
      value,
      (r: GenericSuccessJSON): GenericSuccess => {
        return GenericSuccess.fromJSON(r);
      },
      (l: AuthProtectedServiceRemoveIdentityOutputJSON): AuthProtectedServiceRemoveIdentityOutput => {
        return AuthProtectedServiceRemoveIdentityOutput.fromJSON(l);
      }
    )
  }
  
}