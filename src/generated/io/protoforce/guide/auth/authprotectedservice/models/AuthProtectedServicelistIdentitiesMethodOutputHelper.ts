// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceListIdentitiesOutput
} from './AuthProtectedServiceListIdentitiesOutput';
import {
  AuthProtectedServiceListIdentitiesOutputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceListIdentitiesOutputJSON';
import {
  EitherJSON,
  Either,
  fromEitherJSON
} from '../../../../../../irt';
import {
  KnownIdentities
} from '../../KnownIdentities';
import {
  KnownIdentitiesJSON
} from '../../codecs/KnownIdentitiesJSON';

export class AuthProtectedServicelistIdentitiesMethodOutputHelper {
  static toJSON(value: Either<AuthProtectedServiceListIdentitiesOutput, KnownIdentities>): EitherJSON<AuthProtectedServiceListIdentitiesOutputJSON, KnownIdentitiesJSON> {
    return value.toJSON(
      (r: KnownIdentities): KnownIdentitiesJSON => {
        return r.toJSON();
      },
      (l: AuthProtectedServiceListIdentitiesOutput): AuthProtectedServiceListIdentitiesOutputJSON => {
        return l.toJSON();
      }
    );
  }
  
  static fromJSON(value: EitherJSON<AuthProtectedServiceListIdentitiesOutputJSON, KnownIdentitiesJSON>): Either<AuthProtectedServiceListIdentitiesOutput, KnownIdentities> {
    return fromEitherJSON(
      value,
      (r: KnownIdentitiesJSON): KnownIdentities => {
        return KnownIdentities.fromJSON(r);
      },
      (l: AuthProtectedServiceListIdentitiesOutputJSON): AuthProtectedServiceListIdentitiesOutput => {
        return AuthProtectedServiceListIdentitiesOutput.fromJSON(l);
      }
    )
  }
  
}