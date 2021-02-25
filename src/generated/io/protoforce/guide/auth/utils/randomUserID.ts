// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  UserID
} from '../UserID';

export function randomUserID(): UserID {
  return new UserID({
    id: Random.nextUUID()
  });
}
