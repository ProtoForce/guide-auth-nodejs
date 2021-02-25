// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceConfirmPhoneOutput
} from './AuthServiceConfirmPhoneOutput';
import {
  AuthServiceConfirmPhoneOutputJSON
} from '../../codecs/authservice/models/AuthServiceConfirmPhoneOutputJSON';
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

export class AuthServiceconfirmPhoneMethodOutputHelper {
  static toJSON(value: Either<AuthServiceConfirmPhoneOutput, GenericSuccess>): EitherJSON<AuthServiceConfirmPhoneOutputJSON, GenericSuccessJSON> {
    return value.toJSON(
      (r: GenericSuccess): GenericSuccessJSON => {
        return r.toJSON();
      },
      (l: AuthServiceConfirmPhoneOutput): AuthServiceConfirmPhoneOutputJSON => {
        return l.toJSON();
      }
    );
  }
  
  static fromJSON(value: EitherJSON<AuthServiceConfirmPhoneOutputJSON, GenericSuccessJSON>): Either<AuthServiceConfirmPhoneOutput, GenericSuccess> {
    return fromEitherJSON(
      value,
      (r: GenericSuccessJSON): GenericSuccess => {
        return GenericSuccess.fromJSON(r);
      },
      (l: AuthServiceConfirmPhoneOutputJSON): AuthServiceConfirmPhoneOutput => {
        return AuthServiceConfirmPhoneOutput.fromJSON(l);
      }
    )
  }
  
}