// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authprotectedservice.models

import {
  AuthProtectedServiceDisable2FAOutput
} from '../../../authprotectedservice/models/AuthProtectedServiceDisable2FAOutput';
import {
  Random
} from '../../../../../../../irt';
import {
  randomForbiddenError
} from '../../randomForbiddenError';
import {
  randomInternalError
} from '../../randomInternalError';

export function randomAuthProtectedServiceDisable2FAOutput(): AuthProtectedServiceDisable2FAOutput {
  const r = Random.rndNumber(0, 1, true);
  switch (r) {
    case 0: return AuthProtectedServiceDisable2FAOutput.fromInternalError(randomInternalError());
    case 1: return AuthProtectedServiceDisable2FAOutput.fromForbiddenError(randomForbiddenError());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
