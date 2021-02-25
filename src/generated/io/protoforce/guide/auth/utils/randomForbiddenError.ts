// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  ForbiddenError
} from '../ForbiddenError';
import {
  Random
} from '../../../../../irt';

export function randomForbiddenError(): ForbiddenError {
  return new ForbiddenError({
    message: Random.nextString()
  });
}
