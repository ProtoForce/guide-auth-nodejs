// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authservice.models

import {
  AuthServiceSigninOutput
} from '../../../authservice/models/AuthServiceSigninOutput';
import {
  Random
} from '../../../../../../../irt';
import {
  randomInternalError
} from '../../randomInternalError';
import {
  randomNotFoundError
} from '../../randomNotFoundError';

export function randomAuthServiceSigninOutput(): AuthServiceSigninOutput {
  const r = Random.rndNumber(0, 1, true);
  switch (r) {
    case 0: return AuthServiceSigninOutput.fromInternalError(randomInternalError());
    case 1: return AuthServiceSigninOutput.fromNotFoundError(randomNotFoundError());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
