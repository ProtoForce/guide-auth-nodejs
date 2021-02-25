// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs.authservice.models

import {
  InternalErrorJSON
} from '../../InternalErrorJSON';
import {
  JSONWithTypeNested
} from '../../../../../../../irt';
import {
  NotFoundErrorJSON
} from '../../NotFoundErrorJSON';


export type AuthServiceResetPasswordOutputJSON = JSONWithTypeNested<InternalErrorJSON | NotFoundErrorJSON>;