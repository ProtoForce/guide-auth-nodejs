// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authservice.models

import {
  AuthServiceResetPasswordInput
} from '../../../authservice/models/AuthServiceResetPasswordInput';
import {
  randomUserLookup
} from '../../randomUserLookup';

export function randomAuthServiceResetPasswordInput(): AuthServiceResetPasswordInput {
  return new AuthServiceResetPasswordInput({
    lookup: randomUserLookup()
  });
}
