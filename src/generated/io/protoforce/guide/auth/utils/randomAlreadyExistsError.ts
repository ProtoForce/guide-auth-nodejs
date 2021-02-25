// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  AlreadyExistsError
} from '../AlreadyExistsError';
import {
  Random
} from '../../../../../irt';

export function randomAlreadyExistsError(): AlreadyExistsError {
  return new AlreadyExistsError({
    message: Random.nextString()
  });
}
