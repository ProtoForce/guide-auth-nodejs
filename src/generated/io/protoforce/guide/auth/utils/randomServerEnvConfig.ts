// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  ServerEnvConfig
} from '../ServerEnvConfig';
import {
  randomEmailConfig
} from './randomEmailConfig';
import {
  randomProvidersConfig
} from './randomProvidersConfig';
import {
  randomSMSConfig
} from './randomSMSConfig';
import {
  randomTokensConfig
} from './randomTokensConfig';

export function randomServerEnvConfig(): ServerEnvConfig {
  return new ServerEnvConfig({
    tokens: randomTokensConfig(),
    providers: randomProvidersConfig(),
    email: randomEmailConfig(),
    sms: randomSMSConfig()
  });
}
