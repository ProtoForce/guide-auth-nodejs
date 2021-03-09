// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs

import {
  FacebookConfigJSON
} from './FacebookConfigJSON';
import {
  GithubConfigJSON
} from './GithubConfigJSON';
import {
  GoogleConfigJSON
} from './GoogleConfigJSON';
import {
  TwitterConfigJSON
} from './TwitterConfigJSON';

export interface ProvidersConfigJSON {
  facebook: FacebookConfigJSON;
  google: GoogleConfigJSON;
  twitter: TwitterConfigJSON;
  github: GithubConfigJSON;
}