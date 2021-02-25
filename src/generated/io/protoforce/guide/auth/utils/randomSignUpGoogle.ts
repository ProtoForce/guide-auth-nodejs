// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SignUpGoogle
} from '../SignUpGoogle';

export function randomSignUpGoogle(): SignUpGoogle {
  return new SignUpGoogle({
    timezone: Random.nextString(),
    accessToken: Random.nextString()
  });
}
