// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  ServerConfig
} from '../ServerConfig';
import {
  randomEmailServerConfig
} from './randomEmailServerConfig';
import {
  randomFacebookConfig
} from './randomFacebookConfig';
import {
  randomGithubServerConfig
} from './randomGithubServerConfig';
import {
  randomGoogleServerConfig
} from './randomGoogleServerConfig';
import {
  randomSMSServerConfig
} from './randomSMSServerConfig';
import {
  randomTokensServerConfig
} from './randomTokensServerConfig';
import {
  randomTwitterServerConfig
} from './randomTwitterServerConfig';

export function randomServerConfig(): ServerConfig {
  return new ServerConfig({
    tokens: randomTokensServerConfig(),
    email: randomEmailServerConfig(),
    sms: randomSMSServerConfig(),
    facebook: randomFacebookConfig(),
    google: randomGoogleServerConfig(),
    twitter: randomTwitterServerConfig(),
    github: randomGithubServerConfig()
  });
}
