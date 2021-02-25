// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SecondaryIdentityEmail
} from '../SecondaryIdentityEmail';

export function randomSecondaryIdentityEmail(): SecondaryIdentityEmail {
  return new SecondaryIdentityEmail({
    email: Random.nextString()
  });
}
