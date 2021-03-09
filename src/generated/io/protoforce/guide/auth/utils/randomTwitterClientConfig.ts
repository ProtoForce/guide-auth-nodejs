// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  TwitterClientConfig
} from '../TwitterClientConfig';

export function randomTwitterClientConfig(): TwitterClientConfig {
  return new TwitterClientConfig({
    customerId: Random.nextString()
  });
}
