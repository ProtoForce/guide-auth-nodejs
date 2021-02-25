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
  OAuthDataImpl
} from './OAuthDataImpl';
import {
  SignUpEmail
} from './SignUpEmail';
import {
  SignUpFacebook
} from './SignUpFacebook';
import {
  SignUpGithubJSON
} from './codecs/SignUpGithubJSON';
import {
  SignUpGoogle
} from './SignUpGoogle';
import {
  SignUpPhone
} from './SignUpPhone';
import {
  SignUpTwitter
} from './SignUpTwitter';
import {
  SignupAttributes
} from './SignupAttributes';
import {
  SignupAttributesImpl
} from './SignupAttributesImpl';
import {
  TwitterAuth
} from './TwitterAuth';
import {
  WithRTTI
} from '../../../../irt';

export interface SignUpGithubDefn extends WithRTTI {
  timezone: string;
  /**
    * OAuth token
    */
  accessToken: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): SignUpGithubJSON;
}

/**
  * 
  *  Sign up with github
  * 
  * Class io.protoforce.guide.auth/SignUp:Github (member of ADT io.protoforce.guide.auth:SignUp)
  * 
  * Defined at auth.signup.pfm @ 34:3
  */
export class SignUpGithub implements SignUpGithubDefn {
  timezone: string;
  /**
    * OAuth token
    */
  accessToken: string;
  static readonly RTTI_CLASS: string = 'Github';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth/SignUp:Github';
  
  constructor(data?: {timezone: string, /**
    * OAuth token
    */
  accessToken: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.timezone = '';
        this.accessToken = '';
      }
      return;
    }
    this.timezone = data.timezone;
    this.accessToken = data.accessToken;
  }
  
  get RTTI_CLASS(): string {
    return SignUpGithub.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SignUpGithub.RTTI_FQN;
  }
  
  static fromOAuthData(from: OAuthData, timezone: string): SignUpGithub {
    return new SignUpGithub({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadOAuthData(from: OAuthData): void {
    this.accessToken = from.accessToken;
  }
  
  static fromSignupAttributes(from: SignupAttributes, accessToken: string): SignUpGithub {
    return new SignUpGithub({
      accessToken: accessToken,
      timezone: from.timezone
    });
  }
  
  loadSignupAttributes(from: SignupAttributes): void {
    this.timezone = from.timezone;
  }
  
  toOAuthData(): OAuthDataImpl {
    return new OAuthDataImpl({
      accessToken: this.accessToken
    });
  }
  
  static fromGithubAuth(from: GithubAuth, timezone: string): SignUpGithub {
    return new SignUpGithub({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadGithubAuth(from: GithubAuth): void {
    this.accessToken = from.accessToken;
  }
  
  toTwitterAuth(): TwitterAuth {
    return new TwitterAuth({
      accessToken: this.accessToken
    });
  }
  
  toSignUpFacebook(): SignUpFacebook {
    return new SignUpFacebook({
      timezone: this.timezone,
      accessToken: this.accessToken
    });
  }
  
  toSignupAttributes(): SignupAttributesImpl {
    return new SignupAttributesImpl({
      timezone: this.timezone
    });
  }
  
  static fromFacebookAuth(from: FacebookAuth, timezone: string): SignUpGithub {
    return new SignUpGithub({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadFacebookAuth(from: FacebookAuth): void {
    this.accessToken = from.accessToken;
  }
  
  toGoogleAuth(): GoogleAuth {
    return new GoogleAuth({
      accessToken: this.accessToken
    });
  }
  
  toSignUpGoogle(): SignUpGoogle {
    return new SignUpGoogle({
      timezone: this.timezone,
      accessToken: this.accessToken
    });
  }
  
  static fromSignUpEmail(from: SignUpEmail, accessToken: string): SignUpGithub {
    return new SignUpGithub({
      accessToken: accessToken,
      timezone: from.timezone
    });
  }
  
  loadSignUpEmail(from: SignUpEmail): void {
    this.timezone = from.timezone;
  }
  
  toFacebookAuth(): FacebookAuth {
    return new FacebookAuth({
      accessToken: this.accessToken
    });
  }
  
  toSignUpTwitter(): SignUpTwitter {
    return new SignUpTwitter({
      timezone: this.timezone,
      accessToken: this.accessToken
    });
  }
  
  static fromSignUpPhone(from: SignUpPhone, accessToken: string): SignUpGithub {
    return new SignUpGithub({
      accessToken: accessToken,
      timezone: from.timezone
    });
  }
  
  loadSignUpPhone(from: SignUpPhone): void {
    this.timezone = from.timezone;
  }
  
  static fromGoogleAuth(from: GoogleAuth, timezone: string): SignUpGithub {
    return new SignUpGithub({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadGoogleAuth(from: GoogleAuth): void {
    this.accessToken = from.accessToken;
  }
  
  toGithubAuth(): GithubAuth {
    return new GithubAuth({
      accessToken: this.accessToken
    });
  }
  
  static fromTwitterAuth(from: TwitterAuth, timezone: string): SignUpGithub {
    return new SignUpGithub({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadTwitterAuth(from: TwitterAuth): void {
    this.accessToken = from.accessToken;
  }
  
  toJSON(): SignUpGithubJSON {
    return SignUpGithub.toJSON(this);
  }
  
  static toJSON = (value: SignUpGithub): SignUpGithubJSON => {
    return {
      timezone: value.timezone,
      accessToken: value.accessToken
    };
  }
  
  static fromJSON = (value: SignUpGithubJSON): SignUpGithub => {
    return new SignUpGithub({
      timezone: value.timezone,
      accessToken: value.accessToken
    });
  }
  
}