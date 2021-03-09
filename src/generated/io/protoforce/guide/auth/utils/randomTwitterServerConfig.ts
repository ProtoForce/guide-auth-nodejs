// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  TwitterServerConfig
} from '../TwitterServerConfig';

export function randomTwitterServerConfig(): TwitterServerConfig {
  return new TwitterServerConfig({
    customerId: Random.nextString(),
    customerSecret: Random.nextString()
  });
}
