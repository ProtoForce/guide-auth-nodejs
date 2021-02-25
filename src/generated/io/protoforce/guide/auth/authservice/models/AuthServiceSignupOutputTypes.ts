// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AlreadyExistsError
} from '../../AlreadyExistsError';
import {
  InternalError
} from '../../InternalError';

export type AuthServiceSignupOutputTypes = InternalError | AlreadyExistsError;