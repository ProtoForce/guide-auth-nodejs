// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  OAuthDataImpl
} from '../OAuthDataImpl';
import {
  Random
} from '../../../../../irt';

export function randomOAuthDataImpl(): OAuthDataImpl {
  return new OAuthDataImpl({
    accessToken: Random.nextString()
  });
}
