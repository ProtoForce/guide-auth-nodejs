// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authservice.models

import {
  AuthServiceConfirmPhoneOutput
} from '../../../authservice/models/AuthServiceConfirmPhoneOutput';
import {
  Random
} from '../../../../../../../irt';
import {
  randomInternalError
} from '../../randomInternalError';
import {
  randomNotFoundError
} from '../../randomNotFoundError';

export function randomAuthServiceConfirmPhoneOutput(): AuthServiceConfirmPhoneOutput {
  const r = Random.rndNumber(0, 1, true);
  switch (r) {
    case 0: return AuthServiceConfirmPhoneOutput.fromInternalError(randomInternalError());
    case 1: return AuthServiceConfirmPhoneOutput.fromNotFoundError(randomNotFoundError());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
