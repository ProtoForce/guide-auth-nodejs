// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  GithubClientConfig
} from '../GithubClientConfig';
import {
  Random
} from '../../../../../irt';

export function randomGithubClientConfig(): GithubClientConfig {
  return new GithubClientConfig({
    clientId: Random.nextString()
  });
}
