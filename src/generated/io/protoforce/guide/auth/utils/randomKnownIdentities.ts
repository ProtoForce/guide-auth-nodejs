// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  KnownIdentities
} from '../KnownIdentities';

export function randomKnownIdentities(): KnownIdentities {
  return new KnownIdentities({
    confirmed: [],
    unconfirmed: []
  });
}
