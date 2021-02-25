// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authservice.models

import {
  AuthServiceConfirmPhoneInput
} from '../../../authservice/models/AuthServiceConfirmPhoneInput';
import {
  Random
} from '../../../../../../../irt';

export function randomAuthServiceConfirmPhoneInput(): AuthServiceConfirmPhoneInput {
  return new AuthServiceConfirmPhoneInput({
    code: Random.nextString(),
    phone: Random.nextString()
  });
}
