// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils.authprotectedservice.models

import {
  AuthProtectedServiceRemoveIdentityInput
} from '../../../authprotectedservice/models/AuthProtectedServiceRemoveIdentityInput';
import {
  randomSecondaryIdentity
} from '../../randomSecondaryIdentity';

export function randomAuthProtectedServiceRemoveIdentityInput(): AuthProtectedServiceRemoveIdentityInput {
  return new AuthProtectedServiceRemoveIdentityInput({
    identity: randomSecondaryIdentity()
  });
}
