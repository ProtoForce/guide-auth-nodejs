// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  SecondaryIdentityPhoneJSON
} from './codecs/SecondaryIdentityPhoneJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface SecondaryIdentityPhoneDefn extends WithRTTI {
  /**
    * Phone number in international format
    */
  phone: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): SecondaryIdentityPhoneJSON;
}

/**
  * 
  *  Phone secondary identity
  * 
  * Class io.protoforce.guide.auth/SecondaryIdentity:Phone (member of ADT io.protoforce.guide.auth:SecondaryIdentity)
  * 
  * Defined at identity.pfm @ 8:3
  */
export class SecondaryIdentityPhone implements SecondaryIdentityPhoneDefn {
  /**
    * Phone number in international format
    */
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  phone: string;
  static readonly RTTI_CLASS: string = 'Phone';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth/SecondaryIdentity:Phone';
  
  constructor(data?: {/**
    * Phone number in international format
    */
  phone: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.phone = '';
      }
      return;
    }
    this.phone = data.phone;
  }
  
  get RTTI_CLASS(): string {
    return SecondaryIdentityPhone.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SecondaryIdentityPhone.RTTI_FQN;
  }
  
  toJSON(): SecondaryIdentityPhoneJSON {
    return SecondaryIdentityPhone.toJSON(this);
  }
  
  static toJSON = (value: SecondaryIdentityPhone): SecondaryIdentityPhoneJSON => {
    return {
      phone: value.phone
    };
  }
  
  static fromJSON = (value: SecondaryIdentityPhoneJSON): SecondaryIdentityPhone => {
    return new SecondaryIdentityPhone({
      phone: value.phone
    });
  }
  
}