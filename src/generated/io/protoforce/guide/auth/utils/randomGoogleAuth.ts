// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  GoogleAuth
} from '../GoogleAuth';
import {
  Random
} from '../../../../../irt';

export function randomGoogleAuth(): GoogleAuth {
  return new GoogleAuth({
    accessToken: Random.nextString()
  });
}
