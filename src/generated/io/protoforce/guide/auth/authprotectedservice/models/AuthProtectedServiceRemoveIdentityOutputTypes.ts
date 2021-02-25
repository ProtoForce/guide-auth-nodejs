// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  ForbiddenError
} from '../../ForbiddenError';
import {
  InternalError
} from '../../InternalError';
import {
  NotFoundError
} from '../../NotFoundError';

export type AuthProtectedServiceRemoveIdentityOutputTypes = InternalError | ForbiddenError | NotFoundError;