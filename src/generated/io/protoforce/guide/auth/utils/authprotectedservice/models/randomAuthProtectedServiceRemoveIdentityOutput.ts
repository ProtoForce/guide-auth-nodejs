// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authprotectedservice.models

import {
  AuthProtectedServiceRemoveIdentityOutput
} from '../../../authprotectedservice/models/AuthProtectedServiceRemoveIdentityOutput';
import {
  Random
} from '../../../../../../../irt';
import {
  randomForbiddenError
} from '../../randomForbiddenError';
import {
  randomInternalError
} from '../../randomInternalError';
import {
  randomNotFoundError
} from '../../randomNotFoundError';

export function randomAuthProtectedServiceRemoveIdentityOutput(): AuthProtectedServiceRemoveIdentityOutput {
  const r = Random.rndNumber(0, 2, true);
  switch (r) {
    case 0: return AuthProtectedServiceRemoveIdentityOutput.fromInternalError(randomInternalError());
    case 1: return AuthProtectedServiceRemoveIdentityOutput.fromForbiddenError(randomForbiddenError());
    case 2: return AuthProtectedServiceRemoveIdentityOutput.fromNotFoundError(randomNotFoundError());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
