// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.methods

import {
  AuthServiceResetPasswordInput
} from '../models/AuthServiceResetPasswordInput';
import {
  AuthServiceResetPasswordOutput
} from '../models/AuthServiceResetPasswordOutput';
import {
  AuthServiceresetPasswordMethodOutputHelper
} from '../models/AuthServiceresetPasswordMethodOutputHelper';
import {
  GenericSuccess
} from '../../GenericSuccess';
import {
  PromiseEx,
  Either,
  ClientTransport
} from '../../../../../../irt';
import {
  UserLookup
} from '../../UserLookup';
import {
  UserLookupTypes
} from '../../UserLookupTypes';
import {
  authServiceRTTI
} from './authServiceRTTI';
import {
  authServiceResetPasswordName
} from './authServiceResetPasswordName';

export function authServiceResetPassword<C>(input: {lookup: UserLookupTypes | UserLookup}, transport: ClientTransport<C>, context: C): PromiseEx<Either<AuthServiceResetPasswordOutput, GenericSuccess>> {
  return transport.send(
      authServiceRTTI,
      authServiceResetPasswordName,
      new AuthServiceResetPasswordInput({
        ...input,
        lookup: UserLookup.from(input.lookup)
      }),
      {
        in: AuthServiceResetPasswordInput,
        out: AuthServiceresetPasswordMethodOutputHelper,
        alternative: true,
        context
      }
  );
}
