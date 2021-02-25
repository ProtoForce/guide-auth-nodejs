// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authservice.models

import {
  AuthServiceConfirmEmailInput
} from '../../../authservice/models/AuthServiceConfirmEmailInput';
import {
  Random
} from '../../../../../../../irt';

export function randomAuthServiceConfirmEmailInput(): AuthServiceConfirmEmailInput {
  return new AuthServiceConfirmEmailInput({
    code: Random.nextString()
  });
}
