// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  GoogleClientConfig
} from '../GoogleClientConfig';
import {
  Random
} from '../../../../../irt';

export function randomGoogleClientConfig(): GoogleClientConfig {
  return new GoogleClientConfig({
    clientId: Random.nextString(),
    redirectUrl: Random.nextString()
  });
}
