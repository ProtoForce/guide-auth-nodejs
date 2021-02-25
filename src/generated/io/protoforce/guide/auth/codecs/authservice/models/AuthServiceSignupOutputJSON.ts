// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs.authservice.models

import {
  AlreadyExistsErrorJSON
} from '../../AlreadyExistsErrorJSON';
import {
  InternalErrorJSON
} from '../../InternalErrorJSON';
import {
  JSONWithTypeNested
} from '../../../../../../../irt';


export type AuthServiceSignupOutputJSON = JSONWithTypeNested<InternalErrorJSON | AlreadyExistsErrorJSON>;