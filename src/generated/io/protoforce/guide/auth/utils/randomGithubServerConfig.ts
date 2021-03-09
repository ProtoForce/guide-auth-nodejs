// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  GithubServerConfig
} from '../GithubServerConfig';
import {
  Random
} from '../../../../../irt';

export function randomGithubServerConfig(): GithubServerConfig {
  return new GithubServerConfig({
    clientId: Random.nextString(),
    clientSecret: Random.nextString()
  });
}
