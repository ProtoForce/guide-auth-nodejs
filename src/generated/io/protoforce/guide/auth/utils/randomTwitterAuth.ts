// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  TwitterAuth
} from '../TwitterAuth';

export function randomTwitterAuth(): TwitterAuth {
  return new TwitterAuth({
    accessToken: Random.nextString()
  });
}
