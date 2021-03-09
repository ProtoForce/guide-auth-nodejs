// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  PhonePass
} from './PhonePass';
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
  SignUpPhoneJSON
} from './codecs/SignUpPhoneJSON';
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

export interface SignUpPhoneDefn extends WithRTTI {
  timezone: string;
  /**
    * Phone number in an international format: +1 XXX XXX XXXX
    */
  number_: string;
  /**
    * Password
    */
  pass: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): SignUpPhoneJSON;
}

/**
  * 
  *  Sign up with a phone number
  * 
  * Class io.protoforce.guide.auth/SignUp:Phone (member of ADT io.protoforce.guide.auth:SignUp)
  * 
  * Defined at auth.signup.pfm @ 22:3
  */
export class SignUpPhone implements SignUpPhoneDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  timezone: string;
  /**
    * Phone number in an international format: +1 XXX XXX XXXX
    */
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  number_: string;
  /**
    * Password
    */
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  pass: string;
  static readonly RTTI_CLASS: string = 'Phone';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth/SignUp:Phone';
  
  constructor(data?: {timezone: string, /**
    * Phone number in an international format: +1 XXX XXX XXXX
    */
  number_: string, /**
    * Password
    */
  pass: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.timezone = '';
        this.number_ = '';
        this.pass = '';
      }
      return;
    }
    this.timezone = data.timezone;
    this.number_ = data.number_;
    this.pass = data.pass;
  }
  
  get RTTI_CLASS(): string {
    return SignUpPhone.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SignUpPhone.RTTI_FQN;
  }
  
  static fromSignupAttributes(from: SignupAttributes, number_: string, pass: string): SignUpPhone {
    return new SignUpPhone({
      number_: number_,
      pass: pass,
      timezone: from.timezone
    });
  }
  
  loadSignupAttributes(from: SignupAttributes): void {
    this.timezone = from.timezone;
  }
  
  static fromPhonePass(from: PhonePass, timezone: string): SignUpPhone {
    return new SignUpPhone({
      timezone: timezone,
      number_: from.number_,
      pass: from.pass
    });
  }
  
  loadPhonePass(from: PhonePass): void {
    this.number_ = from.number_;
    this.pass = from.pass;
  }
  
  static fromSignUpTwitter(from: SignUpTwitter, number_: string, pass: string): SignUpPhone {
    return new SignUpPhone({
      number_: number_,
      pass: pass,
      timezone: from.timezone
    });
  }
  
  loadSignUpTwitter(from: SignUpTwitter): void {
    this.timezone = from.timezone;
  }
  
  static fromSignUpEmail(from: SignUpEmail, number_: string): SignUpPhone {
    return new SignUpPhone({
      number_: number_,
      timezone: from.timezone,
      pass: from.pass
    });
  }
  
  loadSignUpEmail(from: SignUpEmail): void {
    this.timezone = from.timezone;
    this.pass = from.pass;
  }
  
  static fromSignUpGoogle(from: SignUpGoogle, number_: string, pass: string): SignUpPhone {
    return new SignUpPhone({
      number_: number_,
      pass: pass,
      timezone: from.timezone
    });
  }
  
  loadSignUpGoogle(from: SignUpGoogle): void {
    this.timezone = from.timezone;
  }
  
  static fromSignUpGithub(from: SignUpGithub, number_: string, pass: string): SignUpPhone {
    return new SignUpPhone({
      number_: number_,
      pass: pass,
      timezone: from.timezone
    });
  }
  
  loadSignUpGithub(from: SignUpGithub): void {
    this.timezone = from.timezone;
  }
  
  toSignupAttributes(): SignupAttributesImpl {
    return new SignupAttributesImpl({
      timezone: this.timezone
    });
  }
  
  toPhonePass(): PhonePass {
    return new PhonePass({
      number_: this.number_,
      pass: this.pass
    });
  }
  
  static fromSignUpFacebook(from: SignUpFacebook, number_: string, pass: string): SignUpPhone {
    return new SignUpPhone({
      number_: number_,
      pass: pass,
      timezone: from.timezone
    });
  }
  
  loadSignUpFacebook(from: SignUpFacebook): void {
    this.timezone = from.timezone;
  }
  
  toJSON(): SignUpPhoneJSON {
    return SignUpPhone.toJSON(this);
  }
  
  static toJSON = (value: SignUpPhone): SignUpPhoneJSON => {
    return {
      timezone: value.timezone,
      number: value.number_,
      pass: value.pass
    };
  }
  
  static fromJSON = (value: SignUpPhoneJSON): SignUpPhone => {
    return new SignUpPhone({
      timezone: value.timezone,
      number_: value.number,
      pass: value.pass
    });
  }
  
}