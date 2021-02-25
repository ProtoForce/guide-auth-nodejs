// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  UserInfoImpl
} from '../UserInfoImpl';

export function randomUserInfoImpl(): UserInfoImpl {
  return new UserInfoImpl({
    name: Random.nextString()
  });
}
