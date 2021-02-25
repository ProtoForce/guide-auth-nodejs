// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs.authprotectedservice.models

import {
  AlreadyExistsErrorJSON
} from '../../AlreadyExistsErrorJSON';
import {
  ForbiddenErrorJSON
} from '../../ForbiddenErrorJSON';
import {
  InternalErrorJSON
} from '../../InternalErrorJSON';
import {
  JSONWithTypeNested
} from '../../../../../../../irt';


export type AuthProtectedServiceAddIdentityOutputJSON = JSONWithTypeNested<InternalErrorJSON | ForbiddenErrorJSON | AlreadyExistsErrorJSON>;