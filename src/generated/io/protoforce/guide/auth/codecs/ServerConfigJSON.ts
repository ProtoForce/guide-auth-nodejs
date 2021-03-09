// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs

import {
  EmailServerConfigJSON
} from './EmailServerConfigJSON';
import {
  FacebookConfigJSON
} from './FacebookConfigJSON';
import {
  GithubServerConfigJSON
} from './GithubServerConfigJSON';
import {
  GoogleServerConfigJSON
} from './GoogleServerConfigJSON';
import {
  SMSServerConfigJSON
} from './SMSServerConfigJSON';
import {
  TokensServerConfigJSON
} from './TokensServerConfigJSON';
import {
  TwitterServerConfigJSON
} from './TwitterServerConfigJSON';

export interface ServerConfigJSON {
  tokens: TokensServerConfigJSON;
  email: EmailServerConfigJSON;
  sms: SMSServerConfigJSON;
  facebook: FacebookConfigJSON;
  google: GoogleServerConfigJSON;
  twitter: TwitterServerConfigJSON;
  github: GithubServerConfigJSON;
}