// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  NotFoundError
} from '../NotFoundError';
import {
  Random
} from '../../../../../irt';

export function randomNotFoundError(): NotFoundError {
  return new NotFoundError({
    message: Random.nextString()
  });
}
