// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs

import {
  EmailPassJSON
} from './EmailPassJSON';
import {
  FacebookAuthJSON
} from './FacebookAuthJSON';
import {
  GithubAuthJSON
} from './GithubAuthJSON';
import {
  GoogleAuthJSON
} from './GoogleAuthJSON';
import {
  JSONWithTypeField
} from '../../../../../irt';
import {
  PhonePassJSON
} from './PhonePassJSON';
import {
  SignInTwoFactorJSON
} from './SignInTwoFactorJSON';
import {
  TwitterAuthJSON
} from './TwitterAuthJSON';


export type SignInJSON = JSONWithTypeField<EmailPassJSON> | JSONWithTypeField<PhonePassJSON> | JSONWithTypeField<GoogleAuthJSON> | JSONWithTypeField<GithubAuthJSON> | JSONWithTypeField<FacebookAuthJSON> | JSONWithTypeField<TwitterAuthJSON> | JSONWithTypeField<SignInTwoFactorJSON>;