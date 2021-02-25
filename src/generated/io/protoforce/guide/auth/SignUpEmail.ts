// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  EmailPass
} from './EmailPass';
import {
  SignUpEmailJSON
} from './codecs/SignUpEmailJSON';
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
  SignUpTwitter
} from './SignUpTwitter';
import {
  SignupAttributes
} from './SignupAttributes';
import {
  SignupAttributesImpl
} from './SignupAttributesImpl';
import {
  WithRTTI
} from '../../../../irt';

export interface SignUpEmailDefn extends WithRTTI {
  timezone: string;
  /**
    * User email
    */
  email: string;
  pass: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): SignUpEmailJSON;
}

/**
  * 
  *  Sign up with an email and a password
  * 
  * Class io.protoforce.guide.auth/SignUp:Email (member of ADT io.protoforce.guide.auth:SignUp)
  * 
  * Defined at auth.signup.pfm @ 16:3
  */
export class SignUpEmail implements SignUpEmailDefn {
  timezone: string;
  /**
    * User email
    */
  email: string;
  pass: string;
  static readonly RTTI_CLASS: string = 'Email';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth/SignUp:Email';
  
  constructor(data?: {timezone: string, /**
    * User email
    */
  email: string, pass: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.timezone = '';
        this.email = '';
        this.pass = '';
      }
      return;
    }
    this.timezone = data.timezone;
    this.email = data.email;
    this.pass = data.pass;
  }
  
  get RTTI_CLASS(): string {
    return SignUpEmail.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SignUpEmail.RTTI_FQN;
  }
  
  static fromEmailPass(from: EmailPass, timezone: string): SignUpEmail {
    return new SignUpEmail({
      timezone: timezone,
      email: from.email,
      pass: from.pass
    });
  }
  
  loadEmailPass(from: EmailPass): void {
    this.email = from.email;
    this.pass = from.pass;
  }
  
  static fromSignupAttributes(from: SignupAttributes, email: string, pass: string): SignUpEmail {
    return new SignUpEmail({
      email: email,
      pass: pass,
      timezone: from.timezone
    });
  }
  
  loadSignupAttributes(from: SignupAttributes): void {
    this.timezone = from.timezone;
  }
  
  static fromSignUpTwitter(from: SignUpTwitter, email: string, pass: string): SignUpEmail {
    return new SignUpEmail({
      email: email,
      pass: pass,
      timezone: from.timezone
    });
  }
  
  loadSignUpTwitter(from: SignUpTwitter): void {
    this.timezone = from.timezone;
  }
  
  static fromSignUpPhone(from: SignUpPhone, email: string): SignUpEmail {
    return new SignUpEmail({
      email: email,
      timezone: from.timezone,
      pass: from.pass
    });
  }
  
  loadSignUpPhone(from: SignUpPhone): void {
    this.timezone = from.timezone;
    this.pass = from.pass;
  }
  
  toEmailPass(): EmailPass {
    return new EmailPass({
      email: this.email,
      pass: this.pass
    });
  }
  
  static fromSignUpGithub(from: SignUpGithub, email: string, pass: string): SignUpEmail {
    return new SignUpEmail({
      email: email,
      pass: pass,
      timezone: from.timezone
    });
  }
  
  loadSignUpGithub(from: SignUpGithub): void {
    this.timezone = from.timezone;
  }
  
  static fromSignUpGoogle(from: SignUpGoogle, email: string, pass: string): SignUpEmail {
    return new SignUpEmail({
      email: email,
      pass: pass,
      timezone: from.timezone
    });
  }
  
  loadSignUpGoogle(from: SignUpGoogle): void {
    this.timezone = from.timezone;
  }
  
  static fromSignUpFacebook(from: SignUpFacebook, email: string, pass: string): SignUpEmail {
    return new SignUpEmail({
      email: email,
      pass: pass,
      timezone: from.timezone
    });
  }
  
  loadSignUpFacebook(from: SignUpFacebook): void {
    this.timezone = from.timezone;
  }
  
  toSignupAttributes(): SignupAttributesImpl {
    return new SignupAttributesImpl({
      timezone: this.timezone
    });
  }
  
  toJSON(): SignUpEmailJSON {
    return SignUpEmail.toJSON(this);
  }
  
  static toJSON = (value: SignUpEmail): SignUpEmailJSON => {
    return {
      timezone: value.timezone,
      email: value.email,
      pass: value.pass
    };
  }
  
  static fromJSON = (value: SignUpEmailJSON): SignUpEmail => {
    return new SignUpEmail({
      timezone: value.timezone,
      email: value.email,
      pass: value.pass
    });
  }
  
}