// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs

import {
  IRTErrorAuthJSON
} from './IRTErrorAuthJSON';

export interface AlreadyExistsErrorJSON extends IRTErrorAuthJSON {
  message: string;
}