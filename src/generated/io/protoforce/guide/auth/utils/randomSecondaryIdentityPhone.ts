// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SecondaryIdentityPhone
} from '../SecondaryIdentityPhone';

export function randomSecondaryIdentityPhone(): SecondaryIdentityPhone {
  return new SecondaryIdentityPhone({
    phone: Random.nextString()
  });
}
