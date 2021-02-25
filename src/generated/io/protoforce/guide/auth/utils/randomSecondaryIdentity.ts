// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SecondaryIdentity
} from '../SecondaryIdentity';
import {
  randomSecondaryIdentityEmail
} from './randomSecondaryIdentityEmail';
import {
  randomSecondaryIdentityPhone
} from './randomSecondaryIdentityPhone';

export function randomSecondaryIdentity(): SecondaryIdentity {
  const r = Random.rndNumber(0, 1, true);
  switch (r) {
    case 0: return SecondaryIdentity.fromPhone(randomSecondaryIdentityPhone());
    case 1: return SecondaryIdentity.fromEmail(randomSecondaryIdentityEmail());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
