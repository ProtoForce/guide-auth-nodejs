// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  FacebookAuth
} from './FacebookAuth';
import {
  GithubAuthJSON
} from './codecs/GithubAuthJSON';
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

export interface GithubAuthDefn extends WithRTTI {
  /**
    * OAuth token
    */
  accessToken: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): GithubAuthJSON;
}

/**
  * 
  *  Github Authentication
  * 
  * Class io.protoforce.guide.auth:GithubAuth
  * 
  * Defined at /providers/github.pfm @ 4:1
  */
export class GithubAuth implements GithubAuthDefn {
  /**
    * OAuth token
    */
  accessToken: string;
  static readonly RTTI_CLASS: string = 'GithubAuth';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:GithubAuth';
  
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
    return GithubAuth.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return GithubAuth.RTTI_FQN;
  }
  
  toFacebookAuth(): FacebookAuth {
    return new FacebookAuth({
      accessToken: this.accessToken
    });
  }
  
  toGoogleAuth(): GoogleAuth {
    return new GoogleAuth({
      accessToken: this.accessToken
    });
  }
  
  toTwitterAuth(): TwitterAuth {
    return new TwitterAuth({
      accessToken: this.accessToken
    });
  }
  
  toOAuthData(): OAuthDataImpl {
    return new OAuthDataImpl({
      accessToken: this.accessToken
    });
  }
  
  toJSON(): GithubAuthJSON {
    return GithubAuth.toJSON(this);
  }
  
  static toJSON = (value: GithubAuth): GithubAuthJSON => {
    return {
      accessToken: value.accessToken
    };
  }
  
  static fromJSON = (value: GithubAuthJSON): GithubAuth => {
    return new GithubAuth({
      accessToken: value.accessToken
    });
  }
  
}