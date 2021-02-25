// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  EmailPass
} from '../EmailPass';
import {
  Random
} from '../../../../../irt';

export function randomEmailPass(): EmailPass {
  return new EmailPass({
    email: Random.nextString(),
    pass: Random.nextString()
  });
}
