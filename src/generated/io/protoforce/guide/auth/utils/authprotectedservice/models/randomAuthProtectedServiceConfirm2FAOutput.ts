// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authprotectedservice.models

import {
  AuthProtectedServiceConfirm2FAOutput
} from '../../../authprotectedservice/models/AuthProtectedServiceConfirm2FAOutput';
import {
  Random
} from '../../../../../../../irt';
import {
  randomForbiddenError
} from '../../randomForbiddenError';
import {
  randomInternalError
} from '../../randomInternalError';

export function randomAuthProtectedServiceConfirm2FAOutput(): AuthProtectedServiceConfirm2FAOutput {
  const r = Random.rndNumber(0, 1, true);
  switch (r) {
    case 0: return AuthProtectedServiceConfirm2FAOutput.fromInternalError(randomInternalError());
    case 1: return AuthProtectedServiceConfirm2FAOutput.fromForbiddenError(randomForbiddenError());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
