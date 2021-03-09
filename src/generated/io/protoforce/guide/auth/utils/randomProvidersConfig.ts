// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  ProvidersConfig
} from '../ProvidersConfig';
import {
  randomFacebookConfig
} from './randomFacebookConfig';
import {
  randomGithubConfig
} from './randomGithubConfig';
import {
  randomGoogleConfig
} from './randomGoogleConfig';
import {
  randomTwitterConfig
} from './randomTwitterConfig';

export function randomProvidersConfig(): ProvidersConfig {
  return new ProvidersConfig({
    facebook: randomFacebookConfig(),
    google: randomGoogleConfig(),
    twitter: randomTwitterConfig(),
    github: randomGithubConfig()
  });
}
