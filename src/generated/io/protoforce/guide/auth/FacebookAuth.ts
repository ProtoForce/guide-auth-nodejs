// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  FacebookAuthJSON
} from './codecs/FacebookAuthJSON';
import {
  GithubAuth
} from './GithubAuth';
import {
  GoogleAuth
} from './GoogleAuth';
import {
  OAuthDataImpl
} from './OAuthDataImpl';
import {
  TwitterAuth
} from './TwitterAuth';
import {
  WithRTTI
} from '../../../../irt';

export interface FacebookAuthDefn extends WithRTTI {
  /**
    * OAuth token
    */
  accessToken: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): FacebookAuthJSON;
}

/**
  * 
  *  Facebook Authentication
  * 
  * Class io.protoforce.guide.auth:FacebookAuth
  * 
  * Defined at /providers/facebook.pfm @ 4:1
  */
export class FacebookAuth implements FacebookAuthDefn {
  /**
    * OAuth token
    */
  accessToken: string;
  static readonly RTTI_CLASS: string = 'FacebookAuth';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:FacebookAuth';
  
  constructor(data?: {/**
    * OAuth token
    */
  accessToken: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.accessToken = '';
      }
      return;
    }
    this.accessToken = data.accessToken;
  }
  
  get RTTI_CLASS(): string {
    return FacebookAuth.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return FacebookAuth.RTTI_FQN;
  }
  
  toGithubAuth(): GithubAuth {
    return new GithubAuth({
      accessToken: this.accessToken
    });
  }
  
  toGoogleAuth(): GoogleAuth {
    return new GoogleAuth({
      accessToken: this.accessToken
    });
  }
  
  toOAuthData(): OAuthDataImpl {
    return new OAuthDataImpl({
      accessToken: this.accessToken
    });
  }
  
  toTwitterAuth(): TwitterAuth {
    return new TwitterAuth({
      accessToken: this.accessToken
    });
  }
  
  toJSON(): FacebookAuthJSON {
    return FacebookAuth.toJSON(this);
  }
  
  static toJSON = (value: FacebookAuth): FacebookAuthJSON => {
    return {
      accessToken: value.accessToken
    };
  }
  
  static fromJSON = (value: FacebookAuthJSON): FacebookAuth => {
    return new FacebookAuth({
      accessToken: value.accessToken
    });
  }
  
}