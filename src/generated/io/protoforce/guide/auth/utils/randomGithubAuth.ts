// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  GithubAuth
} from '../GithubAuth';
import {
  Random
} from '../../../../../irt';

export function randomGithubAuth(): GithubAuth {
  return new GithubAuth({
    accessToken: Random.nextString()
  });
}
