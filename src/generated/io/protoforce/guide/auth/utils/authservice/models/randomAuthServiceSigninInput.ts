// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authservice.models

import {
  AuthServiceSigninInput
} from '../../../authservice/models/AuthServiceSigninInput';
import {
  randomSignIn
} from '../../randomSignIn';

export function randomAuthServiceSigninInput(): AuthServiceSigninInput {
  return new AuthServiceSigninInput({
    with_: randomSignIn()
  });
}
