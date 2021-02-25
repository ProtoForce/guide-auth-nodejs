// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SignupAttributesImpl
} from '../SignupAttributesImpl';

export function randomSignupAttributesImpl(): SignupAttributesImpl {
  return new SignupAttributesImpl({
    timezone: Random.nextString()
  });
}
