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
  SignUpGoogleJSON
} from './codecs/SignUpGoogleJSON';
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

export interface SignUpGoogleDefn extends WithRTTI {
  timezone: string;
  /**
    * OAuth token
    */
  accessToken: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): SignUpGoogleJSON;
}

/**
  * 
  *  Sign up with google
  * 
  * Class io.protoforce.guide.auth/SignUp:Google (member of ADT io.protoforce.guide.auth:SignUp)
  * 
  * Defined at auth.signup.pfm @ 28:3
  */
export class SignUpGoogle implements SignUpGoogleDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  timezone: string;
  /**
    * OAuth token
    */
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  accessToken: string;
  static readonly RTTI_CLASS: string = 'Google';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth/SignUp:Google';
  
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
    return SignUpGoogle.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SignUpGoogle.RTTI_FQN;
  }
  
  static fromOAuthData(from: OAuthData, timezone: string): SignUpGoogle {
    return new SignUpGoogle({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadOAuthData(from: OAuthData): void {
    this.accessToken = from.accessToken;
  }
  
  static fromGoogleAuth(from: GoogleAuth, timezone: string): SignUpGoogle {
    return new SignUpGoogle({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadGoogleAuth(from: GoogleAuth): void {
    this.accessToken = from.accessToken;
  }
  
  static fromSignupAttributes(from: SignupAttributes, accessToken: string): SignUpGoogle {
    return new SignUpGoogle({
      accessToken: accessToken,
      timezone: from.timezone
    });
  }
  
  loadSignupAttributes(from: SignupAttributes): void {
    this.timezone = from.timezone;
  }
  
  toSignupAttributes(): SignupAttributesImpl {
    return new SignupAttributesImpl({
      timezone: this.timezone
    });
  }
  
  static fromFacebookAuth(from: FacebookAuth, timezone: string): SignUpGoogle {
    return new SignUpGoogle({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadFacebookAuth(from: FacebookAuth): void {
    this.accessToken = from.accessToken;
  }
  
  toGithubAuth(): GithubAuth {
    return new GithubAuth({
      accessToken: this.accessToken
    });
  }
  
  toSignUpFacebook(): SignUpFacebook {
    return new SignUpFacebook({
      timezone: this.timezone,
      accessToken: this.accessToken
    });
  }
  
  toFacebookAuth(): FacebookAuth {
    return new FacebookAuth({
      accessToken: this.accessToken
    });
  }
  
  toSignUpGithub(): SignUpGithub {
    return new SignUpGithub({
      timezone: this.timezone,
      accessToken: this.accessToken
    });
  }
  
  static fromSignUpEmail(from: SignUpEmail, accessToken: string): SignUpGoogle {
    return new SignUpGoogle({
      accessToken: accessToken,
      timezone: from.timezone
    });
  }
  
  loadSignUpEmail(from: SignUpEmail): void {
    this.timezone = from.timezone;
  }
  
  static fromSignUpPhone(from: SignUpPhone, accessToken: string): SignUpGoogle {
    return new SignUpGoogle({
      accessToken: accessToken,
      timezone: from.timezone
    });
  }
  
  loadSignUpPhone(from: SignUpPhone): void {
    this.timezone = from.timezone;
  }
  
  toTwitterAuth(): TwitterAuth {
    return new TwitterAuth({
      accessToken: this.accessToken
    });
  }
  
  toGoogleAuth(): GoogleAuth {
    return new GoogleAuth({
      accessToken: this.accessToken
    });
  }
  
  static fromGithubAuth(from: GithubAuth, timezone: string): SignUpGoogle {
    return new SignUpGoogle({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadGithubAuth(from: GithubAuth): void {
    this.accessToken = from.accessToken;
  }
  
  static fromTwitterAuth(from: TwitterAuth, timezone: string): SignUpGoogle {
    return new SignUpGoogle({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadTwitterAuth(from: TwitterAuth): void {
    this.accessToken = from.accessToken;
  }
  
  toOAuthData(): OAuthDataImpl {
    return new OAuthDataImpl({
      accessToken: this.accessToken
    });
  }
  
  toSignUpTwitter(): SignUpTwitter {
    return new SignUpTwitter({
      timezone: this.timezone,
      accessToken: this.accessToken
    });
  }
  
  toJSON(): SignUpGoogleJSON {
    return SignUpGoogle.toJSON(this);
  }
  
  static toJSON = (value: SignUpGoogle): SignUpGoogleJSON => {
    return {
      timezone: value.timezone,
      accessToken: value.accessToken
    };
  }
  
  static fromJSON = (value: SignUpGoogleJSON): SignUpGoogle => {
    return new SignUpGoogle({
      timezone: value.timezone,
      accessToken: value.accessToken
    });
  }
  
}