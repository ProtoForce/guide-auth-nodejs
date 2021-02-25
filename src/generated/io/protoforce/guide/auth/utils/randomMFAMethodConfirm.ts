// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  MFAMethodConfirm
} from '../MFAMethodConfirm';
import {
  Random
} from '../../../../../irt';
import {
  randomMFAMethodConfirmApp
} from './randomMFAMethodConfirmApp';

export function randomMFAMethodConfirm(): MFAMethodConfirm {
  const r = Random.rndNumber(0, 0, true);
  switch (r) {
    case 0: return MFAMethodConfirm.fromApp(randomMFAMethodConfirmApp());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
