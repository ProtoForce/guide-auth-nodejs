// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs

import {
  EmailConfigJSON
} from './EmailConfigJSON';
import {
  ProvidersConfigJSON
} from './ProvidersConfigJSON';
import {
  SMSConfigJSON
} from './SMSConfigJSON';
import {
  TokensConfigJSON
} from './TokensConfigJSON';

export interface ServerEnvConfigJSON {
  tokens: TokensConfigJSON;
  providers: ProvidersConfigJSON;
  email: EmailConfigJSON;
  sms: SMSConfigJSON;
}