// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.methods

import {
  AuthServiceSignupInput
} from '../models/AuthServiceSignupInput';
import {
  AuthServiceSignupOutput
} from '../models/AuthServiceSignupOutput';
import {
  AuthServicesignupMethodOutputHelper
} from '../models/AuthServicesignupMethodOutputHelper';
import {
  PromiseEx,
  Either,
  ClientTransport
} from '../../../../../../irt';
import {
  SignUp
} from '../../SignUp';
import {
  SignUpTypes
} from '../../SignUpTypes';
import {
  SigninSuccessResponse
} from '../../SigninSuccessResponse';
import {
  authServiceRTTI
} from './authServiceRTTI';
import {
  authServiceSignupName
} from './authServiceSignupName';

export function authServiceSignup<C>(input: {with_: SignUpTypes | SignUp}, transport: ClientTransport<C>, context: C): PromiseEx<Either<AuthServiceSignupOutput, SigninSuccessResponse>> {
  return transport.send(
      authServiceRTTI,
      authServiceSignupName,
      new AuthServiceSignupInput({
        ...input,
        with_: SignUp.from(input.with_)
      }),
      {
        in: AuthServiceSignupInput,
        out: AuthServicesignupMethodOutputHelper,
        alternative: true,
        context
      }
  );
}
