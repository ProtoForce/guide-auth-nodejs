// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs

import {
  FacebookConfigJSON
} from './FacebookConfigJSON';
import {
  GithubClientConfigJSON
} from './GithubClientConfigJSON';
import {
  GoogleClientConfigJSON
} from './GoogleClientConfigJSON';
import {
  TwitterClientConfigJSON
} from './TwitterClientConfigJSON';

export interface ClientConfigJSON {
  endpoint: string;
  facebook: FacebookConfigJSON;
  google: GoogleClientConfigJSON;
  twitter: TwitterClientConfigJSON;
  github: GithubClientConfigJSON;
}