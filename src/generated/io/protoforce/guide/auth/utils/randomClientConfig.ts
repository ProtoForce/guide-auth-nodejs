// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  ClientConfig
} from '../ClientConfig';
import {
  Random
} from '../../../../../irt';
import {
  randomFacebookConfig
} from './randomFacebookConfig';
import {
  randomGithubClientConfig
} from './randomGithubClientConfig';
import {
  randomGoogleClientConfig
} from './randomGoogleClientConfig';
import {
  randomTwitterClientConfig
} from './randomTwitterClientConfig';

export function randomClientConfig(): ClientConfig {
  return new ClientConfig({
    endpoint: Random.nextString(),
    facebook: randomFacebookConfig(),
    google: randomGoogleClientConfig(),
    twitter: randomTwitterClientConfig(),
    github: randomGithubClientConfig()
  });
}
