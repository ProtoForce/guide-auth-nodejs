// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authprotectedservice.models

import {
  AuthProtectedServiceAddIdentityInput
} from '../../../authprotectedservice/models/AuthProtectedServiceAddIdentityInput';
import {
  randomSecondaryIdentity
} from '../../randomSecondaryIdentity';

export function randomAuthProtectedServiceAddIdentityInput(): AuthProtectedServiceAddIdentityInput {
  return new AuthProtectedServiceAddIdentityInput({
    identity: randomSecondaryIdentity()
  });
}
