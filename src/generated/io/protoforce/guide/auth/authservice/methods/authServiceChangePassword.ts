// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.methods

import {
  AuthServiceChangePasswordInput
} from '../models/AuthServiceChangePasswordInput';
import {
  AuthServiceChangePasswordOutput
} from '../models/AuthServiceChangePasswordOutput';
import {
  AuthServicechangePasswordMethodOutputHelper
} from '../models/AuthServicechangePasswordMethodOutputHelper';
import {
  GenericSuccess
} from '../../GenericSuccess';
import {
  PromiseEx,
  Either,
  ClientTransport
} from '../../../../../../irt';
import {
  authServiceChangePasswordName
} from './authServiceChangePasswordName';
import {
  authServiceRTTI
} from './authServiceRTTI';

export function authServiceChangePassword<C>(input: {changeToken: string, password: string}, transport: ClientTransport<C>, context: C): PromiseEx<Either<AuthServiceChangePasswordOutput, GenericSuccess>> {
  return transport.send(
      authServiceRTTI,
      authServiceChangePasswordName,
      new AuthServiceChangePasswordInput(input),
      {
        in: AuthServiceChangePasswordInput,
        out: AuthServicechangePasswordMethodOutputHelper,
        alternative: true,
        context
      }
  );
}
