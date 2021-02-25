// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SigninResponse
} from '../SigninResponse';
import {
  randomSigninResponseConfirm2FA
} from './randomSigninResponseConfirm2FA';
import {
  randomSigninSuccessResponse
} from './randomSigninSuccessResponse';

export function randomSigninResponse(): SigninResponse {
  const r = Random.rndNumber(0, 1, true);
  switch (r) {
    case 0: return SigninResponse.fromSigninSuccessResponse(randomSigninSuccessResponse());
    case 1: return SigninResponse.fromConfirm2FA(randomSigninResponseConfirm2FA());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
