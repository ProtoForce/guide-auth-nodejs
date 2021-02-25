// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  PhonePass
} from '../PhonePass';
import {
  Random
} from '../../../../../irt';

export function randomPhonePass(): PhonePass {
  return new PhonePass({
    number_: Random.nextString(),
    pass: Random.nextString()
  });
}
