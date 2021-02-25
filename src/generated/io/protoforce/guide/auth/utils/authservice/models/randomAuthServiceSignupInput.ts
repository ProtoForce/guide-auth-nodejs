// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authservice.models

import {
  AuthServiceSignupInput
} from '../../../authservice/models/AuthServiceSignupInput';
import {
  randomSignUp
} from '../../randomSignUp';

export function randomAuthServiceSignupInput(): AuthServiceSignupInput {
  return new AuthServiceSignupInput({
    with_: randomSignUp()
  });
}
