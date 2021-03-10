// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs

import {
  UserJSON
} from './UserJSON';

export interface SigninSuccessResponseJSON {
  user: UserJSON;
  accessToken: string;
}