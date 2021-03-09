// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SMSConfig
} from '../SMSConfig';

export function randomSMSConfig(): SMSConfig {
  return new SMSConfig({
    apiKey: Random.nextString()
  });
}
