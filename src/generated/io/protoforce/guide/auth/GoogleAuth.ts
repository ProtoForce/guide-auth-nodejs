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
  GoogleAuthJSON
} from './codecs/GoogleAuthJSON';
import {
  OAuthDataImpl
} from './OAuthDataImpl';
import {
  TwitterAuth
} from './TwitterAuth';
import {
  WithRTTI
} from '../../../../irt';

export interface GoogleAuthDefn extends WithRTTI {
  /**
    * OAuth token
    */
  accessToken: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): GoogleAuthJSON;
}

/**
  * 
  *  Google Authentication
  * 
  * Class io.protoforce.guide.auth:GoogleAuth
  * 
  * Defined at /providers/google.pfm @ 4:1
  */
export class GoogleAuth implements GoogleAuthDefn {
  /**
    * OAuth token
    */
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  accessToken: string;
  static readonly RTTI_CLASS: string = 'GoogleAuth';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:GoogleAuth';
  
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
    return GoogleAuth.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return GoogleAuth.RTTI_FQN;
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
  
  toFacebookAuth(): FacebookAuth {
    return new FacebookAuth({
      accessToken: this.accessToken
    });
  }
  
  toTwitterAuth(): TwitterAuth {
    return new TwitterAuth({
      accessToken: this.accessToken
    });
  }
  
  toJSON(): GoogleAuthJSON {
    return GoogleAuth.toJSON(this);
  }
  
  static toJSON = (value: GoogleAuth): GoogleAuthJSON => {
    return {
      accessToken: value.accessToken
    };
  }
  
  static fromJSON = (value: GoogleAuthJSON): GoogleAuth => {
    return new GoogleAuth({
      accessToken: value.accessToken
    });
  }
  
}