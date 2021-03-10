// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  SigninSuccessResponseJSON
} from './codecs/SigninSuccessResponseJSON';
import {
  User
} from './User';
import {
  WithRTTI
} from '../../../../irt';

export interface SigninSuccessResponseDefn extends WithRTTI {
  user: User;
  accessToken: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): SigninSuccessResponseJSON;
}

/**
  * 
  *  Class represents a successful sign in of a user, which is a result
  *  of sign up or sign in.
  * 
  * Class io.protoforce.guide.auth:SigninSuccessResponse
  * 
  * Defined at auth.service.pfm @ 6:1
  */
export class SigninSuccessResponse implements SigninSuccessResponseDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  user: User;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  accessToken: string;
  static readonly RTTI_CLASS: string = 'SigninSuccessResponse';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:SigninSuccessResponse';
  
  constructor(data?: {user: User, accessToken: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.accessToken = '';
      }
      return;
    }
    this.user = data.user;
    this.accessToken = data.accessToken;
  }
  
  get RTTI_CLASS(): string {
    return SigninSuccessResponse.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SigninSuccessResponse.RTTI_FQN;
  }
  
  toJSON(): SigninSuccessResponseJSON {
    return SigninSuccessResponse.toJSON(this);
  }
  
  static toJSON = (value: SigninSuccessResponse): SigninSuccessResponseJSON => {
    return {
      user: value.user.toJSON(),
      accessToken: value.accessToken
    };
  }
  
  static fromJSON = (value: SigninSuccessResponseJSON): SigninSuccessResponse => {
    return new SigninSuccessResponse({
      user: User.fromJSON(value.user),
      accessToken: value.accessToken
    });
  }
  
}