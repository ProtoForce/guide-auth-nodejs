// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  TokensServerConfig
} from '../TokensServerConfig';

export function randomTokensServerConfig(): TokensServerConfig {
  return new TokensServerConfig({
    jwtKey: Random.nextString(),
    expiration: Random.nextU32()
  });
}
