// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  SignupAttributesImplJSON
} from './codecs/SignupAttributesImplJSON';
import {
  WithRTTI
} from '../../../../irt';

/**
  * Interface io.protoforce.guide.auth:SignupAttributes
  * 
  * Defined at auth.signup.pfm @ 2:1
  */
export interface SignupAttributes extends WithRTTI {
  timezone: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): SignupAttributesImplJSON;
}