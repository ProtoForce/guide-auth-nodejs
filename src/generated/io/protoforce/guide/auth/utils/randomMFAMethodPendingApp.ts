// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  MFAMethodPendingApp
} from '../MFAMethodPendingApp';
import {
  Random
} from '../../../../../irt';

export function randomMFAMethodPendingApp(): MFAMethodPendingApp {
  return new MFAMethodPendingApp({
    secret: Random.nextString(),
    token: Random.nextString()
  });
}
