// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.methods

import {
  AuthProtectedServiceDisable2FAInput
} from '../models/AuthProtectedServiceDisable2FAInput';
import {
  AuthProtectedServiceDisable2FAOutput
} from '../models/AuthProtectedServiceDisable2FAOutput';
import {
  AuthProtectedServicedisable2FAMethodOutputHelper
} from '../models/AuthProtectedServicedisable2FAMethodOutputHelper';
import {
  GenericSuccess
} from '../../GenericSuccess';
import {
  PromiseEx,
  Either,
  ClientTransport
} from '../../../../../../irt';
import {
  authProtectedServiceDisable2FAName
} from './authProtectedServiceDisable2FAName';
import {
  authProtectedServiceRTTI
} from './authProtectedServiceRTTI';

export function authProtectedServiceDisable2FA<C>(transport: ClientTransport<C>, context: C): PromiseEx<Either<AuthProtectedServiceDisable2FAOutput, GenericSuccess>> {
  return transport.send(
      authProtectedServiceRTTI,
      authProtectedServiceDisable2FAName,
      new AuthProtectedServiceDisable2FAInput(),
      {
        in: AuthProtectedServiceDisable2FAInput,
        out: AuthProtectedServicedisable2FAMethodOutputHelper,
        alternative: true,
        context
      }
  );
}
