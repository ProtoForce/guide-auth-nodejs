// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.methods

import {
  AuthServiceSigninInput
} from '../models/AuthServiceSigninInput';
import {
  AuthServiceSigninOutput
} from '../models/AuthServiceSigninOutput';
import {
  AuthServicesigninMethodOutputHelper
} from '../models/AuthServicesigninMethodOutputHelper';
import {
  PromiseEx,
  Either,
  ClientTransport
} from '../../../../../../irt';
import {
  SignIn
} from '../../SignIn';
import {
  SignInTypes
} from '../../SignInTypes';
import {
  SigninResponse
} from '../../SigninResponse';
import {
  authServiceRTTI
} from './authServiceRTTI';
import {
  authServiceSigninName
} from './authServiceSigninName';

export function authServiceSignin<C>(input: {with_: SignInTypes | SignIn}, transport: ClientTransport<C>, context: C): PromiseEx<Either<AuthServiceSigninOutput, SigninResponse>> {
  return transport.send(
      authServiceRTTI,
      authServiceSigninName,
      new AuthServiceSigninInput({
        ...input,
        with_: SignIn.from(input.with_)
      }),
      {
        in: AuthServiceSigninInput,
        out: AuthServicesigninMethodOutputHelper,
        alternative: true,
        context
      }
  );
}
