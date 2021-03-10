// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceSigninOutputFlatTypes
} from './AuthServiceSigninOutputFlatTypes';
import {
  AuthServiceSigninOutputJSON
} from '../../codecs/authservice/models/AuthServiceSigninOutputJSON';
import {
  AuthServiceSigninOutputTypes
} from './AuthServiceSigninOutputTypes';
import {
  InternalError
} from '../../InternalError';
import {
  InternalErrorJSON
} from '../../codecs/InternalErrorJSON';
import {
  JSONConverter,
  CodecError,
  WithRTTI,
  IRTADT
} from '../../../../../../irt';
import {
  NotFoundError
} from '../../NotFoundError';
import {
  NotFoundErrorJSON
} from '../../codecs/NotFoundErrorJSON';

/**
  * 
  *  Sign in with provided credentials
  * 
  * ADT io.protoforce.guide.auth.authservice.models:SigninOutput
  * 
  * Defined at auth.service.pfm @ 78:3
  */
export class AuthServiceSigninOutput implements WithRTTI, IRTADT<AuthServiceSigninOutputTypes, AuthServiceSigninOutputFlatTypes> {
  value: AuthServiceSigninOutputTypes;
  static readonly RTTI_CLASS: string = 'SigninOutput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authservice.models:SigninOutput';
  
  constructor(value?: {internalError?: InternalError, notFoundError?: NotFoundError}, unambiguous?: AuthServiceSigninOutputTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT AuthServiceSigninOutput must have value provided during instantiation.');
      }
      this.value = unambiguous;
      return;
    }
    if (typeof value.internalError !== 'undefined') {
      this.value = value.internalError;
    } else 
    if (typeof value.notFoundError !== 'undefined') {
      this.value = value.notFoundError;
    } else {
    
      throw new Error('ADT AuthServiceSigninOutput constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): AuthServiceSigninOutputFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: AuthServiceSigninOutputTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: AuthServiceSigninOutputFlatTypes)=> T): T {
    return mapper(this.flatValue);
  }
  
  match<T>(whenInternalError: (value: InternalError)=> T, whenNotFoundError: (value: NotFoundError)=> T): T {
    const v = this.value;
    if (v instanceof InternalError) {
      return whenInternalError(v);
    } else 
    if (v instanceof NotFoundError) {
      return whenNotFoundError(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive match when type is '${typeof v}'`);
  }
  
  flatMatch<T = void>(whenInternalError: (value: InternalError)=> T, whenNotFoundError: (value: NotFoundError)=> T): T {
    const v = this.value;
    if (v instanceof InternalError) {
      return whenInternalError(v);
    } else 
    if (v instanceof NotFoundError) {
      return whenNotFoundError(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive flatMatch when type is '${typeof v}'`);
  }
  
  static fromInternalError(value: InternalError): AuthServiceSigninOutput {
    return new AuthServiceSigninOutput({internalError: value});
  }
  
  static fromNotFoundError(value: NotFoundError): AuthServiceSigninOutput {
    return new AuthServiceSigninOutput({notFoundError: value});
  }
  
  static from(value: AuthServiceSigninOutput | AuthServiceSigninOutputTypes): AuthServiceSigninOutput {
    return value instanceof AuthServiceSigninOutput ? value : new AuthServiceSigninOutput(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return AuthServiceSigninOutput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthServiceSigninOutput.RTTI_FQN;
  }
  
  toJSON(): AuthServiceSigninOutputJSON {
    return AuthServiceSigninOutput.toJSON(this);
  }
  
  static toJSON = (value: AuthServiceSigninOutput): AuthServiceSigninOutputJSON => {
    const v = value.value;
    if (v instanceof InternalError) {
      return JSONConverter.withTypeNested(v, 'InternalError');
    } else 
    if (v instanceof NotFoundError) {
      return JSONConverter.withTypeNested(v, 'NotFoundError');
    } else {
      throw new CodecError('Inconsistent ADT internal type, value: ' + v);
    }
  }
  
  static fromJSON = (value: AuthServiceSigninOutputJSON): AuthServiceSigninOutput => {
    const key = Object.keys(value)[0];
    const val = value[key];
    switch (key) {
      case 'InternalError': {
        const vc = val as InternalErrorJSON;
        return AuthServiceSigninOutput.fromInternalError(InternalError.fromJSON(vc));
      }
      case 'NotFoundError': {
        const vc = val as NotFoundErrorJSON;
        return AuthServiceSigninOutput.fromNotFoundError(NotFoundError.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'SigninOutput'`);
    }
  }
  
}