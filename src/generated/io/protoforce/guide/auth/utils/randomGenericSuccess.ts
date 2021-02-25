// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  GenericSuccess
} from '../GenericSuccess';

export function randomGenericSuccess(): GenericSuccess {
  return new GenericSuccess({
    message: undefined
  });
}
