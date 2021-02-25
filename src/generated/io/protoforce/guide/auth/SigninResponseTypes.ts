// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  SigninResponseConfirm2FA
} from './SigninResponseConfirm2FA';
import {
  SigninSuccessResponse
} from './SigninSuccessResponse';

export type SigninResponseTypes = SigninSuccessResponse | SigninResponseConfirm2FA;