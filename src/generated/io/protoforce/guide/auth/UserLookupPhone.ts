// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  UserLookupPhoneJSON
} from './codecs/UserLookupPhoneJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface UserLookupPhoneDefn extends WithRTTI {
  phone: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): UserLookupPhoneJSON;
}

/**
  * 
  *  Find using Phone
  * 
  * Class io.protoforce.guide.auth/UserLookup:Phone (member of ADT io.protoforce.guide.auth:UserLookup)
  * 
  * Defined at auth.service.pfm @ 61:3
  */
export class UserLookupPhone implements UserLookupPhoneDefn {
  phone: string;
  static readonly RTTI_CLASS: string = 'Phone';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth/UserLookup:Phone';
  
  constructor(data?: {phone: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.phone = '';
      }
      return;
    }
    this.phone = data.phone;
  }
  
  get RTTI_CLASS(): string {
    return UserLookupPhone.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return UserLookupPhone.RTTI_FQN;
  }
  
  toJSON(): UserLookupPhoneJSON {
    return UserLookupPhone.toJSON(this);
  }
  
  static toJSON = (value: UserLookupPhone): UserLookupPhoneJSON => {
    return {
      phone: value.phone
    };
  }
  
  static fromJSON = (value: UserLookupPhoneJSON): UserLookupPhone => {
    return new UserLookupPhone({
      phone: value.phone
    });
  }
  
}