// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  SignupAttributes
} from './SignupAttributes';
import {
  SignupAttributesCodec
} from './codecs/SignupAttributesCodec';
import {
  SignupAttributesImplJSON
} from './codecs/SignupAttributesImplJSON';

export class SignupAttributesImpl implements SignupAttributes {
  timezone: string;
  static readonly RTTI_CLASS: string = 'SignupAttributes';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:SignupAttributes';
  
  constructor(data?: {timezone: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.timezone = '';
      }
      return;
    }
    this.timezone = data.timezone;
  }
  
  get RTTI_CLASS(): string {
    return SignupAttributesImpl.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SignupAttributesImpl.RTTI_FQN;
  }
  
  toSignupAttributes(): SignupAttributesImpl {
    return new SignupAttributesImpl({
      timezone: this.timezone
    });
  }
  
  toJSON(): SignupAttributesImplJSON {
    return SignupAttributesImpl.toJSON(this);
  }
  
  static toJSON = (value: SignupAttributesImpl): SignupAttributesImplJSON => {
    return {
      timezone: value.timezone
    };
  }
  
  static fromJSON = (value: SignupAttributesImplJSON): SignupAttributesImpl => {
    return new SignupAttributesImpl({
      timezone: value.timezone
    });
  }
  
}

SignupAttributesCodec.register(SignupAttributesImpl.RTTI_FQN, SignupAttributesImpl.fromJSON);