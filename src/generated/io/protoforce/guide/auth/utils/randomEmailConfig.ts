// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  EmailConfig
} from '../EmailConfig';
import {
  Random
} from '../../../../../irt';

export function randomEmailConfig(): EmailConfig {
  return new EmailConfig({
    apiKey: Random.nextString(),
    confirmEndpoint: Random.nextString(),
    resetPassEndpoint: Random.nextString()
  });
}
