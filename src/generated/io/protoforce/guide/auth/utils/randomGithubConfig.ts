// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  GithubConfig
} from '../GithubConfig';
import {
  Random
} from '../../../../../irt';

export function randomGithubConfig(): GithubConfig {
  return new GithubConfig({
    clientId: Random.nextString(),
    clientSecret: Random.nextString()
  });
}
