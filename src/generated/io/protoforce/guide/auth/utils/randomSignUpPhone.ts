// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SignUpPhone
} from '../SignUpPhone';

export function randomSignUpPhone(): SignUpPhone {
  return new SignUpPhone({
    timezone: Random.nextString(),
    number_: Random.nextString(),
    pass: Random.nextString()
  });
}
