// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  InternalError
} from '../InternalError';
import {
  Random
} from '../../../../../irt';

export function randomInternalError(): InternalError {
  return new InternalError({
    message: Random.nextString()
  });
}
