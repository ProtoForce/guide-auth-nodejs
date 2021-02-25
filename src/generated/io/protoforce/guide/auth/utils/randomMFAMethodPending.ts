// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  MFAMethodPending
} from '../MFAMethodPending';
import {
  Random
} from '../../../../../irt';
import {
  randomMFAMethodPendingApp
} from './randomMFAMethodPendingApp';

export function randomMFAMethodPending(): MFAMethodPending {
  const r = Random.rndNumber(0, 0, true);
  switch (r) {
    case 0: return MFAMethodPending.fromApp(randomMFAMethodPendingApp());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
