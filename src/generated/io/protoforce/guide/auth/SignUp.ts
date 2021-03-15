// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  JSONConverter,
  CodecError,
  WithRTTI,
  IRTADT
} from '../../../../irt';
import {
  SignUpEmail
} from './SignUpEmail';
import {
  SignUpEmailJSON
} from './codecs/SignUpEmailJSON';
import {
  SignUpFacebook
} from './SignUpFacebook';
import {
  SignUpFacebookJSON
} from './codecs/SignUpFacebookJSON';
import {
  SignUpFlatTypes
} from './SignUpFlatTypes';
import {
  SignUpGithub
} from './SignUpGithub';
import {
  SignUpGithubJSON
} from './codecs/SignUpGithubJSON';
import {
  SignUpGoogle
} from './SignUpGoogle';
import {
  SignUpGoogleJSON
} from './codecs/SignUpGoogleJSON';
import {
  SignUpJSON
} from './codecs/SignUpJSON';
import {
  SignUpPhone
} from './SignUpPhone';
import {
  SignUpPhoneJSON
} from './codecs/SignUpPhoneJSON';
import {
  SignUpTwitter
} from './SignUpTwitter';
import {
  SignUpTwitterJSON
} from './codecs/SignUpTwitterJSON';
import {
  SignUpTypes
} from './SignUpTypes';

export interface SignUpContract {
  timezone: string;
}

/**
  * 
  *  Sign Up options
  * 
  * ADT io.protoforce.guide.auth:SignUp
  * 
  * Defined at auth.signup.pfm @ 10:1
  */
export class SignUp implements WithRTTI, IRTADT<SignUpTypes, SignUpFlatTypes> {
  value: SignUpTypes;
  static readonly RTTI_CLASS: string = 'SignUp';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:SignUp';
  
  constructor(value?: {email?: SignUpEmail, phone?: SignUpPhone, google?: SignUpGoogle, github?: SignUpGithub, facebook?: SignUpFacebook, twitter?: SignUpTwitter}, unambiguous?: SignUpTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT SignUp must have value provided during instantiation.');
      }
      this.value = unambiguous;
      return;
    }
    if (typeof value.email !== 'undefined') {
      this.value = value.email;
    } else 
    if (typeof value.phone !== 'undefined') {
      this.value = value.phone;
    } else 
    if (typeof value.google !== 'undefined') {
      this.value = value.google;
    } else 
    if (typeof value.github !== 'undefined') {
      this.value = value.github;
    } else 
    if (typeof value.facebook !== 'undefined') {
      this.value = value.facebook;
    } else 
    if (typeof value.twitter !== 'undefined') {
      this.value = value.twitter;
    } else {
    
      throw new Error('ADT SignUp constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): SignUpFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: SignUpTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: SignUpFlatTypes)=> T): T {
    return mapper(this.flatValue);
  }
  
  match<T>(whenEmail: (value: SignUpEmail)=> T, whenPhone: (value: SignUpPhone)=> T, whenGoogle: (value: SignUpGoogle)=> T, whenGithub: (value: SignUpGithub)=> T, whenFacebook: (value: SignUpFacebook)=> T, whenTwitter: (value: SignUpTwitter)=> T): T {
    const v = this.value;
    if (v instanceof SignUpEmail) {
      return whenEmail(v);
    } else 
    if (v instanceof SignUpPhone) {
      return whenPhone(v);
    } else 
    if (v instanceof SignUpGoogle) {
      return whenGoogle(v);
    } else 
    if (v instanceof SignUpGithub) {
      return whenGithub(v);
    } else 
    if (v instanceof SignUpFacebook) {
      return whenFacebook(v);
    } else 
    if (v instanceof SignUpTwitter) {
      return whenTwitter(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive match when type is '${typeof v}'`);
  }
  
  flatMatch<T = void>(whenEmail: (value: SignUpEmail)=> T, whenPhone: (value: SignUpPhone)=> T, whenGoogle: (value: SignUpGoogle)=> T, whenGithub: (value: SignUpGithub)=> T, whenFacebook: (value: SignUpFacebook)=> T, whenTwitter: (value: SignUpTwitter)=> T): T {
    const v = this.value;
    if (v instanceof SignUpEmail) {
      return whenEmail(v);
    } else 
    if (v instanceof SignUpPhone) {
      return whenPhone(v);
    } else 
    if (v instanceof SignUpGoogle) {
      return whenGoogle(v);
    } else 
    if (v instanceof SignUpGithub) {
      return whenGithub(v);
    } else 
    if (v instanceof SignUpFacebook) {
      return whenFacebook(v);
    } else 
    if (v instanceof SignUpTwitter) {
      return whenTwitter(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive flatMatch when type is '${typeof v}'`);
  }
  
  static fromEmail(value: SignUpEmail): SignUp {
    return new SignUp({email: value});
  }
  
  static fromPhone(value: SignUpPhone): SignUp {
    return new SignUp({phone: value});
  }
  
  static fromGoogle(value: SignUpGoogle): SignUp {
    return new SignUp({google: value});
  }
  
  static fromGithub(value: SignUpGithub): SignUp {
    return new SignUp({github: value});
  }
  
  static fromFacebook(value: SignUpFacebook): SignUp {
    return new SignUp({facebook: value});
  }
  
  static fromTwitter(value: SignUpTwitter): SignUp {
    return new SignUp({twitter: value});
  }
  
  static from(value: SignUp | SignUpTypes): SignUp {
    return value instanceof SignUp ? value : new SignUp(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return SignUp.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SignUp.RTTI_FQN;
  }
  
  toJSON(): SignUpJSON {
    return SignUp.toJSON(this);
  }
  
  static toJSON = (value: SignUp): SignUpJSON => {
    const v = value.value;
    if (v instanceof SignUpEmail) {
      return JSONConverter.withTypeField<SignUpEmail, SignUpEmailJSON>(v, '$method', 'Email');
    } else 
    if (v instanceof SignUpPhone) {
      return JSONConverter.withTypeField<SignUpPhone, SignUpPhoneJSON>(v, '$method', 'Phone');
    } else 
    if (v instanceof SignUpGoogle) {
      return JSONConverter.withTypeField<SignUpGoogle, SignUpGoogleJSON>(v, '$method', 'Google');
    } else 
    if (v instanceof SignUpGithub) {
      return JSONConverter.withTypeField<SignUpGithub, SignUpGithubJSON>(v, '$method', 'Github');
    } else 
    if (v instanceof SignUpFacebook) {
      return JSONConverter.withTypeField<SignUpFacebook, SignUpFacebookJSON>(v, '$method', 'Facebook');
    } else 
    if (v instanceof SignUpTwitter) {
      return JSONConverter.withTypeField<SignUpTwitter, SignUpTwitterJSON>(v, '$method', 'Twitter');
    } else {
      throw new CodecError('Inconsistent ADT internal type, value: ' + v);
    }
  }
  
  static fromJSON = (value: SignUpJSON): SignUp => {
    const keyarr = Array.isArray(value.$method) ? value.$method : [value.$method];
    const key = keyarr[0];
    const val = keyarr.length > 1 ?
       Object.assign(
         {},
         value,
         {'$method': keyarr.length === 2 ? keyarr[1] : keyarr.slice(1)}
       ) : value;
             
    switch (key) {
      case 'Email': {
        const vc = val as SignUpEmailJSON;
        return SignUp.fromEmail(SignUpEmail.fromJSON(vc));
      }
      case 'Phone': {
        const vc = val as SignUpPhoneJSON;
        return SignUp.fromPhone(SignUpPhone.fromJSON(vc));
      }
      case 'Google': {
        const vc = val as SignUpGoogleJSON;
        return SignUp.fromGoogle(SignUpGoogle.fromJSON(vc));
      }
      case 'Github': {
        const vc = val as SignUpGithubJSON;
        return SignUp.fromGithub(SignUpGithub.fromJSON(vc));
      }
      case 'Facebook': {
        const vc = val as SignUpFacebookJSON;
        return SignUp.fromFacebook(SignUpFacebook.fromJSON(vc));
      }
      case 'Twitter': {
        const vc = val as SignUpTwitterJSON;
        return SignUp.fromTwitter(SignUpTwitter.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'SignUp'`);
    }
  }
  
}