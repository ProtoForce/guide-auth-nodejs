// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authservice.models

import {
  AuthServiceChangePasswordOutput
} from '../../../authservice/models/AuthServiceChangePasswordOutput';
import {
  Random
} from '../../../../../../../irt';
import {
  randomInternalError
} from '../../randomInternalError';
import {
  randomNotFoundError
} from '../../randomNotFoundError';

export function randomAuthServiceChangePasswordOutput(): AuthServiceChangePasswordOutput {
  const r = Random.rndNumber(0, 1, true);
  switch (r) {
    case 0: return AuthServiceChangePasswordOutput.fromInternalError(randomInternalError());
    case 1: return AuthServiceChangePasswordOutput.fromNotFoundError(randomNotFoundError());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
