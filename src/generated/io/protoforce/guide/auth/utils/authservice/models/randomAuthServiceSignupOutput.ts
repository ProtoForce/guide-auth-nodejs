// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authservice.models

import {
  AuthServiceSignupOutput
} from '../../../authservice/models/AuthServiceSignupOutput';
import {
  Random
} from '../../../../../../../irt';
import {
  randomAlreadyExistsError
} from '../../randomAlreadyExistsError';
import {
  randomInternalError
} from '../../randomInternalError';

export function randomAuthServiceSignupOutput(): AuthServiceSignupOutput {
  const r = Random.rndNumber(0, 1, true);
  switch (r) {
    case 0: return AuthServiceSignupOutput.fromInternalError(randomInternalError());
    case 1: return AuthServiceSignupOutput.fromAlreadyExistsError(randomAlreadyExistsError());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
