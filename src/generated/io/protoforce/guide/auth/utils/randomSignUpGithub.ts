// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SignUpGithub
} from '../SignUpGithub';

export function randomSignUpGithub(): SignUpGithub {
  return new SignUpGithub({
    timezone: Random.nextString(),
    accessToken: Random.nextString()
  });
}
