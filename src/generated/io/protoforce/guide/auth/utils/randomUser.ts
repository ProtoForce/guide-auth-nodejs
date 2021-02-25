// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  User
} from '../User';
import {
  randomUserID
} from './randomUserID';

export function randomUser(): User {
  return new User({
    name: Random.nextString(),
    id: randomUserID(),
    verified: Random.nextBool()
  });
}
