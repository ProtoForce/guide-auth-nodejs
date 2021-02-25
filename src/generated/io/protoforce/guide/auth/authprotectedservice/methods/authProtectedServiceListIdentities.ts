// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.methods

import {
  AuthProtectedServiceListIdentitiesInput
} from '../models/AuthProtectedServiceListIdentitiesInput';
import {
  AuthProtectedServiceListIdentitiesOutput
} from '../models/AuthProtectedServiceListIdentitiesOutput';
import {
  AuthProtectedServicelistIdentitiesMethodOutputHelper
} from '../models/AuthProtectedServicelistIdentitiesMethodOutputHelper';
import {
  KnownIdentities
} from '../../KnownIdentities';
import {
  PromiseEx,
  Either,
  ClientTransport
} from '../../../../../../irt';
import {
  authProtectedServiceListIdentitiesName
} from './authProtectedServiceListIdentitiesName';
import {
  authProtectedServiceRTTI
} from './authProtectedServiceRTTI';

export function authProtectedServiceListIdentities<C>(transport: ClientTransport<C>, context: C): PromiseEx<Either<AuthProtectedServiceListIdentitiesOutput, KnownIdentities>> {
  return transport.send(
      authProtectedServiceRTTI,
      authProtectedServiceListIdentitiesName,
      new AuthProtectedServiceListIdentitiesInput(),
      {
        in: AuthProtectedServiceListIdentitiesInput,
        out: AuthProtectedServicelistIdentitiesMethodOutputHelper,
        alternative: true,
        context
      }
  );
}
