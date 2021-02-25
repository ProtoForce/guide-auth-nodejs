// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authservice.models

import {
  AuthServiceConfirmEmailOutput
} from '../../../authservice/models/AuthServiceConfirmEmailOutput';
import {
  Random
} from '../../../../../../../irt';
import {
  randomInternalError
} from '../../randomInternalError';
import {
  randomNotFoundError
} from '../../randomNotFoundError';

export function randomAuthServiceConfirmEmailOutput(): AuthServiceConfirmEmailOutput {
  const r = Random.rndNumber(0, 1, true);
  switch (r) {
    case 0: return AuthServiceConfirmEmailOutput.fromInternalError(randomInternalError());
    case 1: return AuthServiceConfirmEmailOutput.fromNotFoundError(randomNotFoundError());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
