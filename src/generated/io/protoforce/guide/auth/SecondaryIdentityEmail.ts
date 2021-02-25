// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  SecondaryIdentityEmailJSON
} from './codecs/SecondaryIdentityEmailJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface SecondaryIdentityEmailDefn extends WithRTTI {
  /**
    * Email
    */
  email: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): SecondaryIdentityEmailJSON;
}

/**
  * 
  *  Email secondary identity
  * 
  * Class io.protoforce.guide.auth/SecondaryIdentity:Email (member of ADT io.protoforce.guide.auth:SecondaryIdentity)
  * 
  * Defined at identity.pfm @ 17:3
  */
export class SecondaryIdentityEmail implements SecondaryIdentityEmailDefn {
  /**
    * Email
    */
  email: string;
  static readonly RTTI_CLASS: string = 'Email';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth/SecondaryIdentity:Email';
  
  constructor(data?: {/**
    * Email
    */
  email: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.email = '';
      }
      return;
    }
    this.email = data.email;
  }
  
  get RTTI_CLASS(): string {
    return SecondaryIdentityEmail.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SecondaryIdentityEmail.RTTI_FQN;
  }
  
  toJSON(): SecondaryIdentityEmailJSON {
    return SecondaryIdentityEmail.toJSON(this);
  }
  
  static toJSON = (value: SecondaryIdentityEmail): SecondaryIdentityEmailJSON => {
    return {
      email: value.email
    };
  }
  
  static fromJSON = (value: SecondaryIdentityEmailJSON): SecondaryIdentityEmail => {
    return new SecondaryIdentityEmail({
      email: value.email
    });
  }
  
}