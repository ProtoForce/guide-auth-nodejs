// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SignUpTwitter
} from '../SignUpTwitter';

export function randomSignUpTwitter(): SignUpTwitter {
  return new SignUpTwitter({
    timezone: Random.nextString(),
    accessToken: Random.nextString()
  });
}
