// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  GoogleServerConfig
} from '../GoogleServerConfig';
import {
  Random
} from '../../../../../irt';

export function randomGoogleServerConfig(): GoogleServerConfig {
  return new GoogleServerConfig({
    clientId: Random.nextString(),
    redirectUrl: Random.nextString(),
    clientSecret: Random.nextString()
  });
}
