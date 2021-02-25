// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs

import {
  JSONWithTypeField
} from '../../../../../irt';
import {
  SigninResponseConfirm2FAJSON
} from './SigninResponseConfirm2FAJSON';
import {
  SigninSuccessResponseJSON
} from './SigninSuccessResponseJSON';


export type SigninResponseJSON = JSONWithTypeField<SigninSuccessResponseJSON> | JSONWithTypeField<SigninResponseConfirm2FAJSON>;