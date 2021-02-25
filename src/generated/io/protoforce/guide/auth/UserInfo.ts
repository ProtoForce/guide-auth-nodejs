// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  UserInfoImplJSON
} from './codecs/UserInfoImplJSON';
import {
  WithRTTI
} from '../../../../irt';

/**
  * 
  *  User info
  * 
  * Interface io.protoforce.guide.auth:UserInfo
  * 
  * Defined at user.pfm @ 12:1
  */
export interface UserInfo extends WithRTTI {
  name: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): UserInfoImplJSON;
}