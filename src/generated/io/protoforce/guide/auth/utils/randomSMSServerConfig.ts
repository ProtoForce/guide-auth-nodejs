// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SMSServerConfig
} from '../SMSServerConfig';

export function randomSMSServerConfig(): SMSServerConfig {
  return new SMSServerConfig({
    apiKey: Random.nextString()
  });
}
