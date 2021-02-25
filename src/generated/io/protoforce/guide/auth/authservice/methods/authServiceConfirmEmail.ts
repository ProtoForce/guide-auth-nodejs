// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.methods

import {
  AuthServiceConfirmEmailInput
} from '../models/AuthServiceConfirmEmailInput';
import {
  AuthServiceConfirmEmailOutput
} from '../models/AuthServiceConfirmEmailOutput';
import {
  AuthServiceconfirmEmailMethodOutputHelper
} from '../models/AuthServiceconfirmEmailMethodOutputHelper';
import {
  GenericSuccess
} from '../../GenericSuccess';
import {
  PromiseEx,
  Either,
  ClientTransport
} from '../../../../../../irt';
import {
  authServiceConfirmEmailName
} from './authServiceConfirmEmailName';
import {
  authServiceRTTI
} from './authServiceRTTI';

export function authServiceConfirmEmail<C>(input: {code: string}, transport: ClientTransport<C>, context: C): PromiseEx<Either<AuthServiceConfirmEmailOutput, GenericSuccess>> {
  return transport.send(
      authServiceRTTI,
      authServiceConfirmEmailName,
      new AuthServiceConfirmEmailInput(input),
      {
        in: AuthServiceConfirmEmailInput,
        out: AuthServiceconfirmEmailMethodOutputHelper,
        alternative: true,
        context
      }
  );
}
