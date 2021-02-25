// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  MFAMethodConfirmApp
} from '../MFAMethodConfirmApp';
import {
  Random
} from '../../../../../irt';

export function randomMFAMethodConfirmApp(): MFAMethodConfirmApp {
  return new MFAMethodConfirmApp({
    code: Random.nextString(),
    token: Random.nextString()
  });
}
