// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authprotectedservice.models

import {
  AuthProtectedServiceRequest2FAOutput
} from '../../../authprotectedservice/models/AuthProtectedServiceRequest2FAOutput';
import {
  Random
} from '../../../../../../../irt';
import {
  randomForbiddenError
} from '../../randomForbiddenError';
import {
  randomInternalError
} from '../../randomInternalError';

export function randomAuthProtectedServiceRequest2FAOutput(): AuthProtectedServiceRequest2FAOutput {
  const r = Random.rndNumber(0, 1, true);
  switch (r) {
    case 0: return AuthProtectedServiceRequest2FAOutput.fromInternalError(randomInternalError());
    case 1: return AuthProtectedServiceRequest2FAOutput.fromForbiddenError(randomForbiddenError());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
