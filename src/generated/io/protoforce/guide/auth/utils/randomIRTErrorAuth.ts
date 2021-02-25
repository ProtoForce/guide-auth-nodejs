// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  IRTErrorAuth
} from '../IRTErrorAuth';
import {
  Random
} from '../../../../../irt';

export function randomIRTErrorAuth(): IRTErrorAuth {
  return new IRTErrorAuth({
    message: Random.nextString()
  });
}
