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
  SignUpGithub
} from './SignUpGithub';
import {
  SignUpGoogle
} from './SignUpGoogle';
import {
  SignUpPhone
} from './SignUpPhone';
import {
  SignUpTwitterJSON
} from './codecs/SignUpTwitterJSON';
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

export interface SignUpTwitterDefn extends WithRTTI {
  timezone: string;
  /**
    * OAuth token
    */
  accessToken: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): SignUpTwitterJSON;
}

/**
  * 
  *  Sign up with Twitter
  * 
  * Class io.protoforce.guide.auth/SignUp:Twitter (member of ADT io.protoforce.guide.auth:SignUp)
  * 
  * Defined at auth.signup.pfm @ 46:3
  */
export class SignUpTwitter implements SignUpTwitterDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  timezone: string;
  /**
    * OAuth token
    */
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  accessToken: string;
  static readonly RTTI_CLASS: string = 'Twitter';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth/SignUp:Twitter';
  
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
    return SignUpTwitter.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SignUpTwitter.RTTI_FQN;
  }
  
  static fromSignupAttributes(from: SignupAttributes, accessToken: string): SignUpTwitter {
    return new SignUpTwitter({
      accessToken: accessToken,
      timezone: from.timezone
    });
  }
  
  loadSignupAttributes(from: SignupAttributes): void {
    this.timezone = from.timezone;
  }
  
  static fromOAuthData(from: OAuthData, timezone: string): SignUpTwitter {
    return new SignUpTwitter({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadOAuthData(from: OAuthData): void {
    this.accessToken = from.accessToken;
  }
  
  static fromTwitterAuth(from: TwitterAuth, timezone: string): SignUpTwitter {
    return new SignUpTwitter({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadTwitterAuth(from: TwitterAuth): void {
    this.accessToken = from.accessToken;
  }
  
  static fromSignUpPhone(from: SignUpPhone, accessToken: string): SignUpTwitter {
    return new SignUpTwitter({
      accessToken: accessToken,
      timezone: from.timezone
    });
  }
  
  loadSignUpPhone(from: SignUpPhone): void {
    this.timezone = from.timezone;
  }
  
  static fromSignUpEmail(from: SignUpEmail, accessToken: string): SignUpTwitter {
    return new SignUpTwitter({
      accessToken: accessToken,
      timezone: from.timezone
    });
  }
  
  loadSignUpEmail(from: SignUpEmail): void {
    this.timezone = from.timezone;
  }
  
  toSignUpFacebook(): SignUpFacebook {
    return new SignUpFacebook({
      timezone: this.timezone,
      accessToken: this.accessToken
    });
  }
  
  toSignUpGithub(): SignUpGithub {
    return new SignUpGithub({
      timezone: this.timezone,
      accessToken: this.accessToken
    });
  }
  
  toSignUpGoogle(): SignUpGoogle {
    return new SignUpGoogle({
      timezone: this.timezone,
      accessToken: this.accessToken
    });
  }
  
  toOAuthData(): OAuthDataImpl {
    return new OAuthDataImpl({
      accessToken: this.accessToken
    });
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
  
  static fromFacebookAuth(from: FacebookAuth, timezone: string): SignUpTwitter {
    return new SignUpTwitter({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadFacebookAuth(from: FacebookAuth): void {
    this.accessToken = from.accessToken;
  }
  
  toTwitterAuth(): TwitterAuth {
    return new TwitterAuth({
      accessToken: this.accessToken
    });
  }
  
  static fromGoogleAuth(from: GoogleAuth, timezone: string): SignUpTwitter {
    return new SignUpTwitter({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadGoogleAuth(from: GoogleAuth): void {
    this.accessToken = from.accessToken;
  }
  
  static fromGithubAuth(from: GithubAuth, timezone: string): SignUpTwitter {
    return new SignUpTwitter({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadGithubAuth(from: GithubAuth): void {
    this.accessToken = from.accessToken;
  }
  
  toFacebookAuth(): FacebookAuth {
    return new FacebookAuth({
      accessToken: this.accessToken
    });
  }
  
  toSignupAttributes(): SignupAttributesImpl {
    return new SignupAttributesImpl({
      timezone: this.timezone
    });
  }
  
  toJSON(): SignUpTwitterJSON {
    return SignUpTwitter.toJSON(this);
  }
  
  static toJSON = (value: SignUpTwitter): SignUpTwitterJSON => {
    return {
      timezone: value.timezone,
      accessToken: value.accessToken
    };
  }
  
  static fromJSON = (value: SignUpTwitterJSON): SignUpTwitter => {
    return new SignUpTwitter({
      timezone: value.timezone,
      accessToken: value.accessToken
    });
  }
  
}