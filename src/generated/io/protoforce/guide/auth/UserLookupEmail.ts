// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  UserLookupEmailJSON
} from './codecs/UserLookupEmailJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface UserLookupEmailDefn extends WithRTTI {
  email: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): UserLookupEmailJSON;
}

/**
  * 
  *  Find using Email
  * 
  * Class io.protoforce.guide.auth/UserLookup:Email (member of ADT io.protoforce.guide.auth:UserLookup)
  * 
  * Defined at auth.service.pfm @ 57:3
  */
export class UserLookupEmail implements UserLookupEmailDefn {
  email: string;
  static readonly RTTI_CLASS: string = 'Email';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth/UserLookup:Email';
  
  constructor(data?: {email: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.email = '';
      }
      return;
    }
    this.email = data.email;
  }
  
  get RTTI_CLASS(): string {
    return UserLookupEmail.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return UserLookupEmail.RTTI_FQN;
  }
  
  toJSON(): UserLookupEmailJSON {
    return UserLookupEmail.toJSON(this);
  }
  
  static toJSON = (value: UserLookupEmail): UserLookupEmailJSON => {
    return {
      email: value.email
    };
  }
  
  static fromJSON = (value: UserLookupEmailJSON): UserLookupEmail => {
    return new UserLookupEmail({
      email: value.email
    });
  }
  
}