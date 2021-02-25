// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  SigninSuccessResponse
} from '../SigninSuccessResponse';
import {
  randomUser
} from './randomUser';

export function randomSigninSuccessResponse(): SigninSuccessResponse {
  return new SigninSuccessResponse({
    user: randomUser()
  });
}
