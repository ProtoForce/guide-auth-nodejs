// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.methods

import {
  AuthProtectedServiceAddIdentityInput
} from '../models/AuthProtectedServiceAddIdentityInput';
import {
  AuthProtectedServiceAddIdentityOutput
} from '../models/AuthProtectedServiceAddIdentityOutput';
import {
  AuthProtectedServiceaddIdentityMethodOutputHelper
} from '../models/AuthProtectedServiceaddIdentityMethodOutputHelper';
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
  authProtectedServiceAddIdentityName
} from './authProtectedServiceAddIdentityName';
import {
  authProtectedServiceRTTI
} from './authProtectedServiceRTTI';

export function authProtectedServiceAddIdentity<C>(input: {identity: SecondaryIdentityTypes | SecondaryIdentity}, transport: ClientTransport<C>, context: C): PromiseEx<Either<AuthProtectedServiceAddIdentityOutput, GenericSuccess>> {
  return transport.send(
      authProtectedServiceRTTI,
      authProtectedServiceAddIdentityName,
      new AuthProtectedServiceAddIdentityInput({
        ...input,
        identity: SecondaryIdentity.from(input.identity)
      }),
      {
        in: AuthProtectedServiceAddIdentityInput,
        out: AuthProtectedServiceaddIdentityMethodOutputHelper,
        alternative: true,
        context
      }
  );
}
