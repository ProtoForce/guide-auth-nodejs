// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  TwitterConfig
} from '../TwitterConfig';

export function randomTwitterConfig(): TwitterConfig {
  return new TwitterConfig({
    customerId: Random.nextString(),
    customerSecret: Random.nextString()
  });
}
