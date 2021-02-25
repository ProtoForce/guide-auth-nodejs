// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.methods

import {
  AuthProtectedServiceConfirm2FAInput
} from '../models/AuthProtectedServiceConfirm2FAInput';
import {
  AuthProtectedServiceConfirm2FAOutput
} from '../models/AuthProtectedServiceConfirm2FAOutput';
import {
  AuthProtectedServiceconfirm2FAMethodOutputHelper
} from '../models/AuthProtectedServiceconfirm2FAMethodOutputHelper';
import {
  GenericSuccess
} from '../../GenericSuccess';
import {
  MFAMethodConfirm
} from '../../MFAMethodConfirm';
import {
  MFAMethodConfirmTypes
} from '../../MFAMethodConfirmTypes';
import {
  PromiseEx,
  Either,
  ClientTransport
} from '../../../../../../irt';
import {
  authProtectedServiceConfirm2FAName
} from './authProtectedServiceConfirm2FAName';
import {
  authProtectedServiceRTTI
} from './authProtectedServiceRTTI';

export function authProtectedServiceConfirm2FA<C>(input: {method: MFAMethodConfirmTypes | MFAMethodConfirm}, transport: ClientTransport<C>, context: C): PromiseEx<Either<AuthProtectedServiceConfirm2FAOutput, GenericSuccess>> {
  return transport.send(
      authProtectedServiceRTTI,
      authProtectedServiceConfirm2FAName,
      new AuthProtectedServiceConfirm2FAInput({
        ...input,
        method: MFAMethodConfirm.from(input.method)
      }),
      {
        in: AuthProtectedServiceConfirm2FAInput,
        out: AuthProtectedServiceconfirm2FAMethodOutputHelper,
        alternative: true,
        context
      }
  );
}
