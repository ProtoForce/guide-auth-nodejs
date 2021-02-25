// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authprotectedservice.models

import {
  AuthProtectedServiceRequest2FAInput
} from '../../../authprotectedservice/models/AuthProtectedServiceRequest2FAInput';
import {
  randomMFAMethodRequest
} from '../../randomMFAMethodRequest';

export function randomAuthProtectedServiceRequest2FAInput(): AuthProtectedServiceRequest2FAInput {
  return new AuthProtectedServiceRequest2FAInput({
    method: randomMFAMethodRequest()
  });
}
