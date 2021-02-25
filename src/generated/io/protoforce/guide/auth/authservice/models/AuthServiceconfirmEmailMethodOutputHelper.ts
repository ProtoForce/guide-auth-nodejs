// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceConfirmEmailOutput
} from './AuthServiceConfirmEmailOutput';
import {
  AuthServiceConfirmEmailOutputJSON
} from '../../codecs/authservice/models/AuthServiceConfirmEmailOutputJSON';
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

export class AuthServiceconfirmEmailMethodOutputHelper {
  static toJSON(value: Either<AuthServiceConfirmEmailOutput, GenericSuccess>): EitherJSON<AuthServiceConfirmEmailOutputJSON, GenericSuccessJSON> {
    return value.toJSON(
      (r: GenericSuccess): GenericSuccessJSON => {
        return r.toJSON();
      },
      (l: AuthServiceConfirmEmailOutput): AuthServiceConfirmEmailOutputJSON => {
        return l.toJSON();
      }
    );
  }
  
  static fromJSON(value: EitherJSON<AuthServiceConfirmEmailOutputJSON, GenericSuccessJSON>): Either<AuthServiceConfirmEmailOutput, GenericSuccess> {
    return fromEitherJSON(
      value,
      (r: GenericSuccessJSON): GenericSuccess => {
        return GenericSuccess.fromJSON(r);
      },
      (l: AuthServiceConfirmEmailOutputJSON): AuthServiceConfirmEmailOutput => {
        return AuthServiceConfirmEmailOutput.fromJSON(l);
      }
    )
  }
  
}