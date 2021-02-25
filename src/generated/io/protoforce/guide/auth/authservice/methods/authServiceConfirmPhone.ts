// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.methods

import {
  AuthServiceConfirmPhoneInput
} from '../models/AuthServiceConfirmPhoneInput';
import {
  AuthServiceConfirmPhoneOutput
} from '../models/AuthServiceConfirmPhoneOutput';
import {
  AuthServiceconfirmPhoneMethodOutputHelper
} from '../models/AuthServiceconfirmPhoneMethodOutputHelper';
import {
  GenericSuccess
} from '../../GenericSuccess';
import {
  PromiseEx,
  Either,
  ClientTransport
} from '../../../../../../irt';
import {
  authServiceConfirmPhoneName
} from './authServiceConfirmPhoneName';
import {
  authServiceRTTI
} from './authServiceRTTI';

export function authServiceConfirmPhone<C>(input: {code: string, phone: string}, transport: ClientTransport<C>, context: C): PromiseEx<Either<AuthServiceConfirmPhoneOutput, GenericSuccess>> {
  return transport.send(
      authServiceRTTI,
      authServiceConfirmPhoneName,
      new AuthServiceConfirmPhoneInput(input),
      {
        in: AuthServiceConfirmPhoneInput,
        out: AuthServiceconfirmPhoneMethodOutputHelper,
        alternative: true,
        context
      }
  );
}
