// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authprotectedservice.models

import {
  AuthProtectedServiceConfirm2FAInput
} from '../../../authprotectedservice/models/AuthProtectedServiceConfirm2FAInput';
import {
  randomMFAMethodConfirm
} from '../../randomMFAMethodConfirm';

export function randomAuthProtectedServiceConfirm2FAInput(): AuthProtectedServiceConfirm2FAInput {
  return new AuthProtectedServiceConfirm2FAInput({
    method: randomMFAMethodConfirm()
  });
}
