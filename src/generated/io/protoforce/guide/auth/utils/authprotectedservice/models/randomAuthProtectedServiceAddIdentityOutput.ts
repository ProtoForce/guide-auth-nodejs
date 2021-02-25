// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authprotectedservice.models

import {
  AuthProtectedServiceAddIdentityOutput
} from '../../../authprotectedservice/models/AuthProtectedServiceAddIdentityOutput';
import {
  Random
} from '../../../../../../../irt';
import {
  randomAlreadyExistsError
} from '../../randomAlreadyExistsError';
import {
  randomForbiddenError
} from '../../randomForbiddenError';
import {
  randomInternalError
} from '../../randomInternalError';

export function randomAuthProtectedServiceAddIdentityOutput(): AuthProtectedServiceAddIdentityOutput {
  const r = Random.rndNumber(0, 2, true);
  switch (r) {
    case 0: return AuthProtectedServiceAddIdentityOutput.fromInternalError(randomInternalError());
    case 1: return AuthProtectedServiceAddIdentityOutput.fromForbiddenError(randomForbiddenError());
    case 2: return AuthProtectedServiceAddIdentityOutput.fromAlreadyExistsError(randomAlreadyExistsError());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
