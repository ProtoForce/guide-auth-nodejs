// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  EmailPass
} from './EmailPass';
import {
  FacebookAuth
} from './FacebookAuth';
import {
  GithubAuth
} from './GithubAuth';
import {
  GoogleAuth
} from './GoogleAuth';
import {
  PhonePass
} from './PhonePass';
import {
  SignInTwoFactor
} from './SignInTwoFactor';
import {
  TwitterAuth
} from './TwitterAuth';

export type SignInTypes = EmailPass | PhonePass | GoogleAuth | GithubAuth | FacebookAuth | TwitterAuth | SignInTwoFactor;