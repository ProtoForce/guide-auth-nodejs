// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  GoogleConfig
} from '../GoogleConfig';
import {
  Random
} from '../../../../../irt';

export function randomGoogleConfig(): GoogleConfig {
  return new GoogleConfig({
    clientId: Random.nextString(),
    clientSecret: Random.nextString(),
    redirectUrl: Random.nextString()
  });
}
