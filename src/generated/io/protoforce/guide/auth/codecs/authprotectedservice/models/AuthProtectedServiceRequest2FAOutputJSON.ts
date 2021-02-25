// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs.authprotectedservice.models

import {
  ForbiddenErrorJSON
} from '../../ForbiddenErrorJSON';
import {
  InternalErrorJSON
} from '../../InternalErrorJSON';
import {
  JSONWithTypeNested
} from '../../../../../../../irt';


export type AuthProtectedServiceRequest2FAOutputJSON = JSONWithTypeNested<InternalErrorJSON | ForbiddenErrorJSON>;