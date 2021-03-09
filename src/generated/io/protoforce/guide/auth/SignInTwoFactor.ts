// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  SignInTwoFactorJSON
} from './codecs/SignInTwoFactorJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface SignInTwoFactorDefn extends WithRTTI {
  /**
    * Token which was provided in the SigninResponse.Confirm2FA model
    */
  token: string;
  /**
    * Code from a secondary authentication method
    */
  code: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): SignInTwoFactorJSON;
}

/**
  * 
  *  Sign in following two factor auth request
  * 
  * Class io.protoforce.guide.auth/SignIn:TwoFactor (member of ADT io.protoforce.guide.auth:SignIn)
  * 
  * Defined at auth.signin.pfm @ 33:3
  */
export class SignInTwoFactor implements SignInTwoFactorDefn {
  /**
    * Token which was provided in the SigninResponse.Confirm2FA model
    */
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  token: string;
  /**
    * Code from a secondary authentication method
    */
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  code: string;
  static readonly RTTI_CLASS: string = 'TwoFactor';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth/SignIn:TwoFactor';
  
  constructor(data?: {/**
    * Token which was provided in the SigninResponse.Confirm2FA model
    */
  token: string, /**
    * Code from a secondary authentication method
    */
  code: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.token = '';
        this.code = '';
      }
      return;
    }
    this.token = data.token;
    this.code = data.code;
  }
  
  get RTTI_CLASS(): string {
    return SignInTwoFactor.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SignInTwoFactor.RTTI_FQN;
  }
  
  toJSON(): SignInTwoFactorJSON {
    return SignInTwoFactor.toJSON(this);
  }
  
  static toJSON = (value: SignInTwoFactor): SignInTwoFactorJSON => {
    return {
      token: value.token,
      code: value.code
    };
  }
  
  static fromJSON = (value: SignInTwoFactorJSON): SignInTwoFactor => {
    return new SignInTwoFactor({
      token: value.token,
      code: value.code
    });
  }
  
}