// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  FacebookConfig
} from '../FacebookConfig';
import {
  Random
} from '../../../../../irt';

export function randomFacebookConfig(): FacebookConfig {
  return new FacebookConfig({
    appId: Random.nextString()
  });
}
