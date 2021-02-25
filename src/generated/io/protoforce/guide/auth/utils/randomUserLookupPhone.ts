// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  UserLookupPhone
} from '../UserLookupPhone';

export function randomUserLookupPhone(): UserLookupPhone {
  return new UserLookupPhone({
    phone: Random.nextString()
  });
}
