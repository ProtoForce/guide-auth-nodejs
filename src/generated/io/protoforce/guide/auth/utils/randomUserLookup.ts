// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  UserLookup
} from '../UserLookup';
import {
  randomUserID
} from './randomUserID';
import {
  randomUserLookupEmail
} from './randomUserLookupEmail';
import {
  randomUserLookupPhone
} from './randomUserLookupPhone';

export function randomUserLookup(): UserLookup {
  const r = Random.rndNumber(0, 2, true);
  switch (r) {
    case 0: return UserLookup.fromUserID(randomUserID());
    case 1: return UserLookup.fromEmail(randomUserLookupEmail());
    case 2: return UserLookup.fromPhone(randomUserLookupPhone());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
