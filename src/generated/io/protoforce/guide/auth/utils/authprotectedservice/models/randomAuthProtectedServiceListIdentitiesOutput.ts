// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authprotectedservice.models

import {
  AuthProtectedServiceListIdentitiesOutput
} from '../../../authprotectedservice/models/AuthProtectedServiceListIdentitiesOutput';
import {
  Random
} from '../../../../../../../irt';
import {
  randomForbiddenError
} from '../../randomForbiddenError';
import {
  randomInternalError
} from '../../randomInternalError';

export function randomAuthProtectedServiceListIdentitiesOutput(): AuthProtectedServiceListIdentitiesOutput {
  const r = Random.rndNumber(0, 1, true);
  switch (r) {
    case 0: return AuthProtectedServiceListIdentitiesOutput.fromInternalError(randomInternalError());
    case 1: return AuthProtectedServiceListIdentitiesOutput.fromForbiddenError(randomForbiddenError());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
