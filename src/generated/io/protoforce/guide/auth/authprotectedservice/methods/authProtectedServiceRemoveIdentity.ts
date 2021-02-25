// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.methods

import {
  AuthProtectedServiceRemoveIdentityInput
} from '../models/AuthProtectedServiceRemoveIdentityInput';
import {
  AuthProtectedServiceRemoveIdentityOutput
} from '../models/AuthProtectedServiceRemoveIdentityOutput';
import {
  AuthProtectedServiceremoveIdentityMethodOutputHelper
} from '../models/AuthProtectedServiceremoveIdentityMethodOutputHelper';
import {
  GenericSuccess
} from '../../GenericSuccess';
import {
  PromiseEx,
  Either,
  ClientTransport
} from '../../../../../../irt';
import {
  SecondaryIdentity
} from '../../SecondaryIdentity';
import {
  SecondaryIdentityTypes
} from '../../SecondaryIdentityTypes';
import {
  authProtectedServiceRTTI
} from './authProtectedServiceRTTI';
import {
  authProtectedServiceRemoveIdentityName
} from './authProtectedServiceRemoveIdentityName';

export function authProtectedServiceRemoveIdentity<C>(input: {identity: SecondaryIdentityTypes | SecondaryIdentity}, transport: ClientTransport<C>, context: C): PromiseEx<Either<AuthProtectedServiceRemoveIdentityOutput, GenericSuccess>> {
  return transport.send(
      authProtectedServiceRTTI,
      authProtectedServiceRemoveIdentityName,
      new AuthProtectedServiceRemoveIdentityInput({
        ...input,
        identity: SecondaryIdentity.from(input.identity)
      }),
      {
        in: AuthProtectedServiceRemoveIdentityInput,
        out: AuthProtectedServiceremoveIdentityMethodOutputHelper,
        alternative: true,
        context
      }
  );
}
