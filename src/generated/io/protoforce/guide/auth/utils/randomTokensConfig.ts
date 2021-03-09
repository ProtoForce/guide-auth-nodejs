// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  TokensConfig
} from '../TokensConfig';

export function randomTokensConfig(): TokensConfig {
  return new TokensConfig({
    jwtKey: Random.nextString(),
    expiration: Random.nextU32()
  });
}
