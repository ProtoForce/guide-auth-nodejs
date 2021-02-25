// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  SigninResponseConfirm2FAJSON
} from './codecs/SigninResponseConfirm2FAJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface SigninResponseConfirm2FADefn extends WithRTTI {
  /**
    * Message to display to a user. Examples:
    *    "We've sent you an SMS to number +1XXXXXXX123"
    *    "Please use "
    */
  message: string;
  /**
    * Token is used to hold information about the authentication
    *    attempt
    */
  token: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): SigninResponseConfirm2FAJSON;
}

/**
  * 
  *  Further authentication is required for a user
  * 
  * Class io.protoforce.guide.auth/SigninResponse:Confirm2FA (member of ADT io.protoforce.guide.auth:SigninResponse)
  * 
  * Defined at auth.service.pfm @ 30:3
  */
export class SigninResponseConfirm2FA implements SigninResponseConfirm2FADefn {
  /**
    * Message to display to a user. Examples:
    *    "We've sent you an SMS to number +1XXXXXXX123"
    *    "Please use "
    */
  message: string;
  /**
    * Token is used to hold information about the authentication
    *    attempt
    */
  token: string;
  static readonly RTTI_CLASS: string = 'Confirm2FA';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth/SigninResponse:Confirm2FA';
  
  constructor(data?: {/**
    * Message to display to a user. Examples:
    *    "We've sent you an SMS to number +1XXXXXXX123"
    *    "Please use "
    */
  message: string, /**
    * Token is used to hold information about the authentication
    *    attempt
    */
  token: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.message = '';
        this.token = '';
      }
      return;
    }
    this.message = data.message;
    this.token = data.token;
  }
  
  get RTTI_CLASS(): string {
    return SigninResponseConfirm2FA.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SigninResponseConfirm2FA.RTTI_FQN;
  }
  
  toJSON(): SigninResponseConfirm2FAJSON {
    return SigninResponseConfirm2FA.toJSON(this);
  }
  
  static toJSON = (value: SigninResponseConfirm2FA): SigninResponseConfirm2FAJSON => {
    return {
      message: value.message,
      token: value.token
    };
  }
  
  static fromJSON = (value: SigninResponseConfirm2FAJSON): SigninResponseConfirm2FA => {
    return new SigninResponseConfirm2FA({
      message: value.message,
      token: value.token
    });
  }
  
}