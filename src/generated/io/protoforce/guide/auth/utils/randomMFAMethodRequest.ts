// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  MFAMethodRequest
} from '../MFAMethodRequest';
import {
  Random
} from '../../../../../irt';
import {
  randomMFAMethodRequestApp
} from './randomMFAMethodRequestApp';

export function randomMFAMethodRequest(): MFAMethodRequest {
  const r = Random.rndNumber(0, 0, true);
  switch (r) {
    case 0: return MFAMethodRequest.fromApp(randomMFAMethodRequestApp());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
