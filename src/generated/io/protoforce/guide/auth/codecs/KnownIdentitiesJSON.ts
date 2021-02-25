// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs

import {
  SecondaryIdentityJSON
} from './SecondaryIdentityJSON';

export interface KnownIdentitiesJSON {
  confirmed: SecondaryIdentityJSON[];
  unconfirmed: SecondaryIdentityJSON[];
}