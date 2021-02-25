// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  UserLookupEmail
} from '../UserLookupEmail';

export function randomUserLookupEmail(): UserLookupEmail {
  return new UserLookupEmail({
    email: Random.nextString()
  });
}
