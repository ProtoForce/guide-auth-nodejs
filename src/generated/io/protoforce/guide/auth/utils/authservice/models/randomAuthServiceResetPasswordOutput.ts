// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authservice.models

import {
  AuthServiceResetPasswordOutput
} from '../../../authservice/models/AuthServiceResetPasswordOutput';
import {
  Random
} from '../../../../../../../irt';
import {
  randomInternalError
} from '../../randomInternalError';
import {
  randomNotFoundError
} from '../../randomNotFoundError';

export function randomAuthServiceResetPasswordOutput(): AuthServiceResetPasswordOutput {
  const r = Random.rndNumber(0, 1, true);
  switch (r) {
    case 0: return AuthServiceResetPasswordOutput.fromInternalError(randomInternalError());
    case 1: return AuthServiceResetPasswordOutput.fromNotFoundError(randomNotFoundError());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
