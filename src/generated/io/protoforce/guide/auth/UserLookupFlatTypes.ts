// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  UserID
} from './UserID';
import {
  UserLookupEmail
} from './UserLookupEmail';
import {
  UserLookupPhone
} from './UserLookupPhone';

export type UserLookupFlatTypes = UserID | UserLookupEmail | UserLookupPhone;