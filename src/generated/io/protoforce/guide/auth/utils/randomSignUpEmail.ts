// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SignUpEmail
} from '../SignUpEmail';

export function randomSignUpEmail(): SignUpEmail {
  return new SignUpEmail({
    timezone: Random.nextString(),
    email: Random.nextString(),
    pass: Random.nextString()
  });
}
