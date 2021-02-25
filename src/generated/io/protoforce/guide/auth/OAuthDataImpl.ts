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
  OAuthData
} from './OAuthData';
import {
  OAuthDataCodec
} from './codecs/OAuthDataCodec';
import {
  OAuthDataImplJSON
} from './codecs/OAuthDataImplJSON';
import {
  TwitterAuth
} from './TwitterAuth';

export class OAuthDataImpl implements OAuthData {
  /**
    * OAuth token
    */
  accessToken: string;
  static readonly RTTI_CLASS: string = 'OAuthData';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:OAuthData';
  
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
    return OAuthDataImpl.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return OAuthDataImpl.RTTI_FQN;
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
  
  toJSON(): OAuthDataImplJSON {
    return OAuthDataImpl.toJSON(this);
  }
  
  static toJSON = (value: OAuthDataImpl): OAuthDataImplJSON => {
    return {
      accessToken: value.accessToken
    };
  }
  
  static fromJSON = (value: OAuthDataImplJSON): OAuthDataImpl => {
    return new OAuthDataImpl({
      accessToken: value.accessToken
    });
  }
  
}

OAuthDataCodec.register(OAuthDataImpl.RTTI_FQN, OAuthDataImpl.fromJSON);