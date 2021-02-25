// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  EmailPass
} from './EmailPass';
import {
  EmailPassJSON
} from './codecs/EmailPassJSON';
import {
  FacebookAuth
} from './FacebookAuth';
import {
  FacebookAuthJSON
} from './codecs/FacebookAuthJSON';
import {
  GithubAuth
} from './GithubAuth';
import {
  GithubAuthJSON
} from './codecs/GithubAuthJSON';
import {
  GoogleAuth
} from './GoogleAuth';
import {
  GoogleAuthJSON
} from './codecs/GoogleAuthJSON';
import {
  JSONConverter,
  CodecError,
  WithRTTI,
  IRTADT
} from '../../../../irt';
import {
  PhonePass
} from './PhonePass';
import {
  PhonePassJSON
} from './codecs/PhonePassJSON';
import {
  SignInFlatTypes
} from './SignInFlatTypes';
import {
  SignInJSON
} from './codecs/SignInJSON';
import {
  SignInTwoFactor
} from './SignInTwoFactor';
import {
  SignInTwoFactorJSON
} from './codecs/SignInTwoFactorJSON';
import {
  SignInTypes
} from './SignInTypes';
import {
  TwitterAuth
} from './TwitterAuth';
import {
  TwitterAuthJSON
} from './codecs/TwitterAuthJSON';

/**
  * 
  *  Sign In options
  * 
  * ADT io.protoforce.guide.auth:SignIn
  * 
  * Defined at auth.signin.pfm @ 5:1
  */
export class SignIn implements WithRTTI, IRTADT<SignInTypes, SignInFlatTypes> {
  value: SignInTypes;
  static readonly RTTI_CLASS: string = 'SignIn';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:SignIn';
  
  constructor(value?: {emailPass?: EmailPass, phonePass?: PhonePass, googleAuth?: GoogleAuth, githubAuth?: GithubAuth, facebookAuth?: FacebookAuth, twitterAuth?: TwitterAuth, twoFactor?: SignInTwoFactor}, unambiguous?: SignInTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT SignIn must have value provided during instantiation.');
      }
      this.value = unambiguous;
      return;
    }
    if (typeof value.emailPass !== 'undefined') {
      this.value = value.emailPass;
    } else 
    if (typeof value.phonePass !== 'undefined') {
      this.value = value.phonePass;
    } else 
    if (typeof value.googleAuth !== 'undefined') {
      this.value = value.googleAuth;
    } else 
    if (typeof value.githubAuth !== 'undefined') {
      this.value = value.githubAuth;
    } else 
    if (typeof value.facebookAuth !== 'undefined') {
      this.value = value.facebookAuth;
    } else 
    if (typeof value.twitterAuth !== 'undefined') {
      this.value = value.twitterAuth;
    } else 
    if (typeof value.twoFactor !== 'undefined') {
      this.value = value.twoFactor;
    } else {
    
      throw new Error('ADT SignIn constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): SignInFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: SignInTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: SignInFlatTypes)=> T): T {
    return mapper(this.flatValue);
  }
  
  match<T>(whenEmailPass: (value: EmailPass)=> T, whenPhonePass: (value: PhonePass)=> T, whenGoogleAuth: (value: GoogleAuth)=> T, whenGithubAuth: (value: GithubAuth)=> T, whenFacebookAuth: (value: FacebookAuth)=> T, whenTwitterAuth: (value: TwitterAuth)=> T, whenTwoFactor: (value: SignInTwoFactor)=> T): T {
    const v = this.value;
    if (v instanceof EmailPass) {
      return whenEmailPass(v);
    } else 
    if (v instanceof PhonePass) {
      return whenPhonePass(v);
    } else 
    if (v instanceof GoogleAuth) {
      return whenGoogleAuth(v);
    } else 
    if (v instanceof GithubAuth) {
      return whenGithubAuth(v);
    } else 
    if (v instanceof FacebookAuth) {
      return whenFacebookAuth(v);
    } else 
    if (v instanceof TwitterAuth) {
      return whenTwitterAuth(v);
    } else 
    if (v instanceof SignInTwoFactor) {
      return whenTwoFactor(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive match when type is '${typeof v}'`);
  }
  
  flatMatch<T = void>(whenEmailPass: (value: EmailPass)=> T, whenPhonePass: (value: PhonePass)=> T, whenGoogleAuth: (value: GoogleAuth)=> T, whenGithubAuth: (value: GithubAuth)=> T, whenFacebookAuth: (value: FacebookAuth)=> T, whenTwitterAuth: (value: TwitterAuth)=> T, whenTwoFactor: (value: SignInTwoFactor)=> T): T {
    const v = this.value;
    if (v instanceof EmailPass) {
      return whenEmailPass(v);
    } else 
    if (v instanceof PhonePass) {
      return whenPhonePass(v);
    } else 
    if (v instanceof GoogleAuth) {
      return whenGoogleAuth(v);
    } else 
    if (v instanceof GithubAuth) {
      return whenGithubAuth(v);
    } else 
    if (v instanceof FacebookAuth) {
      return whenFacebookAuth(v);
    } else 
    if (v instanceof TwitterAuth) {
      return whenTwitterAuth(v);
    } else 
    if (v instanceof SignInTwoFactor) {
      return whenTwoFactor(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive flatMatch when type is '${typeof v}'`);
  }
  
  static fromEmailPass(value: EmailPass): SignIn {
    return new SignIn({emailPass: value});
  }
  
  static fromPhonePass(value: PhonePass): SignIn {
    return new SignIn({phonePass: value});
  }
  
  static fromGoogleAuth(value: GoogleAuth): SignIn {
    return new SignIn({googleAuth: value});
  }
  
  static fromGithubAuth(value: GithubAuth): SignIn {
    return new SignIn({githubAuth: value});
  }
  
  static fromFacebookAuth(value: FacebookAuth): SignIn {
    return new SignIn({facebookAuth: value});
  }
  
  static fromTwitterAuth(value: TwitterAuth): SignIn {
    return new SignIn({twitterAuth: value});
  }
  
  static fromTwoFactor(value: SignInTwoFactor): SignIn {
    return new SignIn({twoFactor: value});
  }
  
  static from(value: SignIn | SignInTypes): SignIn {
    return value instanceof SignIn ? value : new SignIn(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return SignIn.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SignIn.RTTI_FQN;
  }
  
  toJSON(): SignInJSON {
    return SignIn.toJSON(this);
  }
  
  static toJSON = (value: SignIn): SignInJSON => {
    const v = value.value;
    if (v instanceof EmailPass) {
      return JSONConverter.withTypeField<EmailPass, EmailPassJSON>(v, '$method', 'EmailPass');
    } else 
    if (v instanceof PhonePass) {
      return JSONConverter.withTypeField<PhonePass, PhonePassJSON>(v, '$method', 'PhonePass');
    } else 
    if (v instanceof GoogleAuth) {
      return JSONConverter.withTypeField<GoogleAuth, GoogleAuthJSON>(v, '$method', 'GoogleAuth');
    } else 
    if (v instanceof GithubAuth) {
      return JSONConverter.withTypeField<GithubAuth, GithubAuthJSON>(v, '$method', 'GithubAuth');
    } else 
    if (v instanceof FacebookAuth) {
      return JSONConverter.withTypeField<FacebookAuth, FacebookAuthJSON>(v, '$method', 'FacebookAuth');
    } else 
    if (v instanceof TwitterAuth) {
      return JSONConverter.withTypeField<TwitterAuth, TwitterAuthJSON>(v, '$method', 'TwitterAuth');
    } else 
    if (v instanceof SignInTwoFactor) {
      return JSONConverter.withTypeField<SignInTwoFactor, SignInTwoFactorJSON>(v, '$method', 'TwoFactor');
    } else {
      throw new CodecError('Inconsistent ADT internal type, value: ' + v);
    }
  }
  
  static fromJSON = (value: SignInJSON): SignIn => {
    const keyarr = Array.isArray(value.$method) ? value.$method : [value.$method];
    const key = keyarr[0];
    const val = (keyarr.length > 1 ?
      {
        ...value,
        $method: keyarr.length === 2 ? keyarr[1] : keyarr.slice(1)
      } : value) as SignInJSON;
             
    switch (key) {
      case 'EmailPass': {
        const vc = val as EmailPassJSON;
        return SignIn.fromEmailPass(EmailPass.fromJSON(vc));
      }
      case 'PhonePass': {
        const vc = val as PhonePassJSON;
        return SignIn.fromPhonePass(PhonePass.fromJSON(vc));
      }
      case 'GoogleAuth': {
        const vc = val as GoogleAuthJSON;
        return SignIn.fromGoogleAuth(GoogleAuth.fromJSON(vc));
      }
      case 'GithubAuth': {
        const vc = val as GithubAuthJSON;
        return SignIn.fromGithubAuth(GithubAuth.fromJSON(vc));
      }
      case 'FacebookAuth': {
        const vc = val as FacebookAuthJSON;
        return SignIn.fromFacebookAuth(FacebookAuth.fromJSON(vc));
      }
      case 'TwitterAuth': {
        const vc = val as TwitterAuthJSON;
        return SignIn.fromTwitterAuth(TwitterAuth.fromJSON(vc));
      }
      case 'TwoFactor': {
        const vc = val as SignInTwoFactorJSON;
        return SignIn.fromTwoFactor(SignInTwoFactor.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'SignIn'`);
    }
  }
  
}