// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SignUpFacebook
} from '../SignUpFacebook';

export function randomSignUpFacebook(): SignUpFacebook {
  return new SignUpFacebook({
    timezone: Random.nextString(),
    accessToken: Random.nextString()
  });
}
