// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  EmailPassJSON
} from './codecs/EmailPassJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface EmailPassDefn extends WithRTTI {
  /**
    * User email
    */
  email: string;
  pass: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): EmailPassJSON;
}

/**
  * 
  *  Email and Password
  * 
  * Class io.protoforce.guide.auth:EmailPass
  * 
  * Defined at /providers/email.pfm @ 4:1
  */
export class EmailPass implements EmailPassDefn {
  /**
    * User email
    */
  email: string;
  pass: string;
  static readonly RTTI_CLASS: string = 'EmailPass';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:EmailPass';
  
  constructor(data?: {/**
    * User email
    */
  email: string, pass: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.email = '';
        this.pass = '';
      }
      return;
    }
    this.email = data.email;
    this.pass = data.pass;
  }
  
  get RTTI_CLASS(): string {
    return EmailPass.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return EmailPass.RTTI_FQN;
  }
  
  toJSON(): EmailPassJSON {
    return EmailPass.toJSON(this);
  }
  
  static toJSON = (value: EmailPass): EmailPassJSON => {
    return {
      email: value.email,
      pass: value.pass
    };
  }
  
  static fromJSON = (value: EmailPassJSON): EmailPass => {
    return new EmailPass({
      email: value.email,
      pass: value.pass
    });
  }
  
}