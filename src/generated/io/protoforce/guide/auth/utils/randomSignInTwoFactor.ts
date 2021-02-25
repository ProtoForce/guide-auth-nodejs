// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SignInTwoFactor
} from '../SignInTwoFactor';

export function randomSignInTwoFactor(): SignInTwoFactor {
  return new SignInTwoFactor({
    token: Random.nextString(),
    code: Random.nextString()
  });
}
