// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  PhonePassJSON
} from './codecs/PhonePassJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface PhonePassDefn extends WithRTTI {
  /**
    * Phone number in an international format: +1 XXX XXX XXXX
    */
  number_: string;
  /**
    * Password
    */
  pass: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): PhonePassJSON;
}

/**
  * 
  *  Phone and password
  * 
  * Class io.protoforce.guide.auth:PhonePass
  * 
  * Defined at /providers/phone.pfm @ 4:1
  */
export class PhonePass implements PhonePassDefn {
  /**
    * Phone number in an international format: +1 XXX XXX XXXX
    */
  number_: string;
  /**
    * Password
    */
  pass: string;
  static readonly RTTI_CLASS: string = 'PhonePass';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:PhonePass';
  
  constructor(data?: {/**
    * Phone number in an international format: +1 XXX XXX XXXX
    */
  number_: string, /**
    * Password
    */
  pass: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.number_ = '';
        this.pass = '';
      }
      return;
    }
    this.number_ = data.number_;
    this.pass = data.pass;
  }
  
  get RTTI_CLASS(): string {
    return PhonePass.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return PhonePass.RTTI_FQN;
  }
  
  toJSON(): PhonePassJSON {
    return PhonePass.toJSON(this);
  }
  
  static toJSON = (value: PhonePass): PhonePassJSON => {
    return {
      number: value.number_,
      pass: value.pass
    };
  }
  
  static fromJSON = (value: PhonePassJSON): PhonePass => {
    return new PhonePass({
      number_: value.number,
      pass: value.pass
    });
  }
  
}