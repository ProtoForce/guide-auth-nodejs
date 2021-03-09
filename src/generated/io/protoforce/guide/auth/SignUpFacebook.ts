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
  SignUpFacebookJSON
} from './codecs/SignUpFacebookJSON';
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

export interface SignUpFacebookDefn extends WithRTTI {
  timezone: string;
  /**
    * OAuth token
    */
  accessToken: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): SignUpFacebookJSON;
}

/**
  * 
  *  Sign up with Facebook
  * 
  * Class io.protoforce.guide.auth/SignUp:Facebook (member of ADT io.protoforce.guide.auth:SignUp)
  * 
  * Defined at auth.signup.pfm @ 40:3
  */
export class SignUpFacebook implements SignUpFacebookDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  timezone: string;
  /**
    * OAuth token
    */
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  accessToken: string;
  static readonly RTTI_CLASS: string = 'Facebook';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth/SignUp:Facebook';
  
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
    return SignUpFacebook.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SignUpFacebook.RTTI_FQN;
  }
  
  static fromOAuthData(from: OAuthData, timezone: string): SignUpFacebook {
    return new SignUpFacebook({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadOAuthData(from: OAuthData): void {
    this.accessToken = from.accessToken;
  }
  
  static fromFacebookAuth(from: FacebookAuth, timezone: string): SignUpFacebook {
    return new SignUpFacebook({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadFacebookAuth(from: FacebookAuth): void {
    this.accessToken = from.accessToken;
  }
  
  static fromSignupAttributes(from: SignupAttributes, accessToken: string): SignUpFacebook {
    return new SignUpFacebook({
      accessToken: accessToken,
      timezone: from.timezone
    });
  }
  
  loadSignupAttributes(from: SignupAttributes): void {
    this.timezone = from.timezone;
  }
  
  toGithubAuth(): GithubAuth {
    return new GithubAuth({
      accessToken: this.accessToken
    });
  }
  
  toSignUpTwitter(): SignUpTwitter {
    return new SignUpTwitter({
      timezone: this.timezone,
      accessToken: this.accessToken
    });
  }
  
  toTwitterAuth(): TwitterAuth {
    return new TwitterAuth({
      accessToken: this.accessToken
    });
  }
  
  toSignUpGoogle(): SignUpGoogle {
    return new SignUpGoogle({
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
  
  toSignupAttributes(): SignupAttributesImpl {
    return new SignupAttributesImpl({
      timezone: this.timezone
    });
  }
  
  toGoogleAuth(): GoogleAuth {
    return new GoogleAuth({
      accessToken: this.accessToken
    });
  }
  
  static fromSignUpPhone(from: SignUpPhone, accessToken: string): SignUpFacebook {
    return new SignUpFacebook({
      accessToken: accessToken,
      timezone: from.timezone
    });
  }
  
  loadSignUpPhone(from: SignUpPhone): void {
    this.timezone = from.timezone;
  }
  
  static fromTwitterAuth(from: TwitterAuth, timezone: string): SignUpFacebook {
    return new SignUpFacebook({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadTwitterAuth(from: TwitterAuth): void {
    this.accessToken = from.accessToken;
  }
  
  toFacebookAuth(): FacebookAuth {
    return new FacebookAuth({
      accessToken: this.accessToken
    });
  }
  
  static fromGithubAuth(from: GithubAuth, timezone: string): SignUpFacebook {
    return new SignUpFacebook({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadGithubAuth(from: GithubAuth): void {
    this.accessToken = from.accessToken;
  }
  
  static fromSignUpEmail(from: SignUpEmail, accessToken: string): SignUpFacebook {
    return new SignUpFacebook({
      accessToken: accessToken,
      timezone: from.timezone
    });
  }
  
  loadSignUpEmail(from: SignUpEmail): void {
    this.timezone = from.timezone;
  }
  
  toOAuthData(): OAuthDataImpl {
    return new OAuthDataImpl({
      accessToken: this.accessToken
    });
  }
  
  static fromGoogleAuth(from: GoogleAuth, timezone: string): SignUpFacebook {
    return new SignUpFacebook({
      timezone: timezone,
      accessToken: from.accessToken
    });
  }
  
  loadGoogleAuth(from: GoogleAuth): void {
    this.accessToken = from.accessToken;
  }
  
  toJSON(): SignUpFacebookJSON {
    return SignUpFacebook.toJSON(this);
  }
  
  static toJSON = (value: SignUpFacebook): SignUpFacebookJSON => {
    return {
      timezone: value.timezone,
      accessToken: value.accessToken
    };
  }
  
  static fromJSON = (value: SignUpFacebookJSON): SignUpFacebook => {
    return new SignUpFacebook({
      timezone: value.timezone,
      accessToken: value.accessToken
    });
  }
  
}