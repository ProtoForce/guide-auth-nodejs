// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  EmailServerConfig
} from '../EmailServerConfig';
import {
  Random
} from '../../../../../irt';

export function randomEmailServerConfig(): EmailServerConfig {
  return new EmailServerConfig({
    apiKey: Random.nextString(),
    confirmEndpoint: Random.nextString(),
    resetPassEndpoint: Random.nextString()
  });
}
