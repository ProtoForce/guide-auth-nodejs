// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceRequest2FAOutput
} from './AuthProtectedServiceRequest2FAOutput';
import {
  AuthProtectedServiceRequest2FAOutputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceRequest2FAOutputJSON';
import {
  EitherJSON,
  Either,
  fromEitherJSON
} from '../../../../../../irt';
import {
  MFAMethodPending
} from '../../MFAMethodPending';
import {
  MFAMethodPendingJSON
} from '../../codecs/MFAMethodPendingJSON';

export class AuthProtectedServicerequest2FAMethodOutputHelper {
  static toJSON(value: Either<AuthProtectedServiceRequest2FAOutput, MFAMethodPending>): EitherJSON<AuthProtectedServiceRequest2FAOutputJSON, MFAMethodPendingJSON> {
    return value.toJSON(
      (r: MFAMethodPending): MFAMethodPendingJSON => {
        return r.toJSON();
      },
      (l: AuthProtectedServiceRequest2FAOutput): AuthProtectedServiceRequest2FAOutputJSON => {
        return l.toJSON();
      }
    );
  }
  
  static fromJSON(value: EitherJSON<AuthProtectedServiceRequest2FAOutputJSON, MFAMethodPendingJSON>): Either<AuthProtectedServiceRequest2FAOutput, MFAMethodPending> {
    return fromEitherJSON(
      value,
      (r: MFAMethodPendingJSON): MFAMethodPending => {
        return MFAMethodPending.fromJSON(r);
      },
      (l: AuthProtectedServiceRequest2FAOutputJSON): AuthProtectedServiceRequest2FAOutput => {
        return AuthProtectedServiceRequest2FAOutput.fromJSON(l);
      }
    )
  }
  
}