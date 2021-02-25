// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SigninResponseConfirm2FA
} from '../SigninResponseConfirm2FA';

export function randomSigninResponseConfirm2FA(): SigninResponseConfirm2FA {
  return new SigninResponseConfirm2FA({
    message: Random.nextString(),
    token: Random.nextString()
  });
}
