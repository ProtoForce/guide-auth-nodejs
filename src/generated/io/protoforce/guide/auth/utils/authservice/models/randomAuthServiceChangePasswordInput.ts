// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authservice.models

import {
  AuthServiceChangePasswordInput
} from '../../../authservice/models/AuthServiceChangePasswordInput';
import {
  Random
} from '../../../../../../../irt';

export function randomAuthServiceChangePasswordInput(): AuthServiceChangePasswordInput {
  return new AuthServiceChangePasswordInput({
    changeToken: Random.nextString(),
    password: Random.nextString()
  });
}
