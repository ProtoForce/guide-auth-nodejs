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
  SigninResponseConfirm2FA
} from './SigninResponseConfirm2FA';
import {
  SigninResponseConfirm2FAJSON
} from './codecs/SigninResponseConfirm2FAJSON';
import {
  SigninResponseFlatTypes
} from './SigninResponseFlatTypes';
import {
  SigninResponseJSON
} from './codecs/SigninResponseJSON';
import {
  SigninResponseTypes
} from './SigninResponseTypes';
import {
  SigninSuccessResponse
} from './SigninSuccessResponse';
import {
  SigninSuccessResponseJSON
} from './codecs/SigninSuccessResponseJSON';

/**
  * 
  *  Sign in method response
  * 
  * ADT io.protoforce.guide.auth:SigninResponse
  * 
  * Defined at auth.service.pfm @ 22:1
  */
export class SigninResponse implements WithRTTI, IRTADT<SigninResponseTypes, SigninResponseFlatTypes> {
  value: SigninResponseTypes;
  static readonly RTTI_CLASS: string = 'SigninResponse';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:SigninResponse';
  
  constructor(value?: {signinSuccessResponse?: SigninSuccessResponse, confirm2FA?: SigninResponseConfirm2FA}, unambiguous?: SigninResponseTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT SigninResponse must have value provided during instantiation.');
      }
      this.value = unambiguous;
      return;
    }
    if (typeof value.signinSuccessResponse !== 'undefined') {
      this.value = value.signinSuccessResponse;
    } else 
    if (typeof value.confirm2FA !== 'undefined') {
      this.value = value.confirm2FA;
    } else {
    
      throw new Error('ADT SigninResponse constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): SigninResponseFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: SigninResponseTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: SigninResponseFlatTypes)=> T): T {
    return mapper(this.flatValue);
  }
  
  match<T>(whenSigninSuccessResponse: (value: SigninSuccessResponse)=> T, whenConfirm2FA: (value: SigninResponseConfirm2FA)=> T): T {
    const v = this.value;
    if (v instanceof SigninSuccessResponse) {
      return whenSigninSuccessResponse(v);
    } else 
    if (v instanceof SigninResponseConfirm2FA) {
      return whenConfirm2FA(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive match when type is '${typeof v}'`);
  }
  
  flatMatch<T = void>(whenSigninSuccessResponse: (value: SigninSuccessResponse)=> T, whenConfirm2FA: (value: SigninResponseConfirm2FA)=> T): T {
    const v = this.value;
    if (v instanceof SigninSuccessResponse) {
      return whenSigninSuccessResponse(v);
    } else 
    if (v instanceof SigninResponseConfirm2FA) {
      return whenConfirm2FA(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive flatMatch when type is '${typeof v}'`);
  }
  
  static fromSigninSuccessResponse(value: SigninSuccessResponse): SigninResponse {
    return new SigninResponse({signinSuccessResponse: value});
  }
  
  static fromConfirm2FA(value: SigninResponseConfirm2FA): SigninResponse {
    return new SigninResponse({confirm2FA: value});
  }
  
  static from(value: SigninResponse | SigninResponseTypes): SigninResponse {
    return value instanceof SigninResponse ? value : new SigninResponse(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return SigninResponse.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SigninResponse.RTTI_FQN;
  }
  
  toJSON(): SigninResponseJSON {
    return SigninResponse.toJSON(this);
  }
  
  static toJSON = (value: SigninResponse): SigninResponseJSON => {
    const v = value.value;
    if (v instanceof SigninSuccessResponse) {
      return JSONConverter.withTypeField<SigninSuccessResponse, SigninSuccessResponseJSON>(v, '$class', 'SigninSuccessResponse');
    } else 
    if (v instanceof SigninResponseConfirm2FA) {
      return JSONConverter.withTypeField<SigninResponseConfirm2FA, SigninResponseConfirm2FAJSON>(v, '$class', 'Confirm2FA');
    } else {
      throw new CodecError('Inconsistent ADT internal type, value: ' + v);
    }
  }
  
  static fromJSON = (value: SigninResponseJSON): SigninResponse => {
    const keyarr = Array.isArray(value.$class) ? value.$class : [value.$class];
    const key = keyarr[0];
    const val = (keyarr.length > 1 ?
      {
        ...value,
        $class: keyarr.length === 2 ? keyarr[1] : keyarr.slice(1)
      } : value) as SigninResponseJSON;
             
    switch (key) {
      case 'SigninSuccessResponse': {
        const vc = val as SigninSuccessResponseJSON;
        return SigninResponse.fromSigninSuccessResponse(SigninSuccessResponse.fromJSON(vc));
      }
      case 'Confirm2FA': {
        const vc = val as SigninResponseConfirm2FAJSON;
        return SigninResponse.fromConfirm2FA(SigninResponseConfirm2FA.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'SigninResponse'`);
    }
  }
  
}