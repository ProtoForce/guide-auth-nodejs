// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AlreadyExistsError
} from '../../AlreadyExistsError';
import {
  ForbiddenError
} from '../../ForbiddenError';
import {
  InternalError
} from '../../InternalError';

export type AuthProtectedServiceAddIdentityOutputFlatTypes = InternalError | ForbiddenError | AlreadyExistsError;