// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  FacebookAuth
} from './FacebookAuth';
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
  TwitterAuthJSON
} from './codecs/TwitterAuthJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface TwitterAuthDefn extends WithRTTI {
  /**
    * OAuth token
    */
  accessToken: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): TwitterAuthJSON;
}

/**
  * 
  *  Twitter Authentication
  * 
  * Class io.protoforce.guide.auth:TwitterAuth
  * 
  * Defined at /providers/twitter.pfm @ 4:1
  */
export class TwitterAuth implements TwitterAuthDefn {
  /**
    * OAuth token
    */
  accessToken: string;
  static readonly RTTI_CLASS: string = 'TwitterAuth';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:TwitterAuth';
  
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
    return TwitterAuth.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return TwitterAuth.RTTI_FQN;
  }
  
  toFacebookAuth(): FacebookAuth {
    return new FacebookAuth({
      accessToken: this.accessToken
    });
  }
  
  toGithubAuth(): GithubAuth {
    return new GithubAuth({
      accessToken: this.accessToken
    });
  }
  
  toOAuthData(): OAuthDataImpl {
    return new OAuthDataImpl({
      accessToken: this.accessToken
    });
  }
  
  toGoogleAuth(): GoogleAuth {
    return new GoogleAuth({
      accessToken: this.accessToken
    });
  }
  
  toJSON(): TwitterAuthJSON {
    return TwitterAuth.toJSON(this);
  }
  
  static toJSON = (value: TwitterAuth): TwitterAuthJSON => {
    return {
      accessToken: value.accessToken
    };
  }
  
  static fromJSON = (value: TwitterAuthJSON): TwitterAuth => {
    return new TwitterAuth({
      accessToken: value.accessToken
    });
  }
  
}