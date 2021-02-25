// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.methods

import {
  AuthProtectedServiceRequest2FAInput
} from '../models/AuthProtectedServiceRequest2FAInput';
import {
  AuthProtectedServiceRequest2FAOutput
} from '../models/AuthProtectedServiceRequest2FAOutput';
import {
  AuthProtectedServicerequest2FAMethodOutputHelper
} from '../models/AuthProtectedServicerequest2FAMethodOutputHelper';
import {
  MFAMethodPending
} from '../../MFAMethodPending';
import {
  MFAMethodRequest
} from '../../MFAMethodRequest';
import {
  MFAMethodRequestTypes
} from '../../MFAMethodRequestTypes';
import {
  PromiseEx,
  Either,
  ClientTransport
} from '../../../../../../irt';
import {
  authProtectedServiceRTTI
} from './authProtectedServiceRTTI';
import {
  authProtectedServiceRequest2FAName
} from './authProtectedServiceRequest2FAName';

export function authProtectedServiceRequest2FA<C>(input: {method: MFAMethodRequestTypes | MFAMethodRequest}, transport: ClientTransport<C>, context: C): PromiseEx<Either<AuthProtectedServiceRequest2FAOutput, MFAMethodPending>> {
  return transport.send(
      authProtectedServiceRTTI,
      authProtectedServiceRequest2FAName,
      new AuthProtectedServiceRequest2FAInput({
        ...input,
        method: MFAMethodRequest.from(input.method)
      }),
      {
        in: AuthProtectedServiceRequest2FAInput,
        out: AuthProtectedServicerequest2FAMethodOutputHelper,
        alternative: true,
        context
      }
  );
}
