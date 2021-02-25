// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  FacebookAuth
} from '../FacebookAuth';
import {
  Random
} from '../../../../../irt';

export function randomFacebookAuth(): FacebookAuth {
  return new FacebookAuth({
    accessToken: Random.nextString()
  });
}
