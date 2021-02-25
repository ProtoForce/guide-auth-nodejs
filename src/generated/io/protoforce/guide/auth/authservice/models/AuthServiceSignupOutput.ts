// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AlreadyExistsError
} from '../../AlreadyExistsError';
import {
  AlreadyExistsErrorJSON
} from '../../codecs/AlreadyExistsErrorJSON';
import {
  AuthServiceSignupOutputFlatTypes
} from './AuthServiceSignupOutputFlatTypes';
import {
  AuthServiceSignupOutputJSON
} from '../../codecs/authservice/models/AuthServiceSignupOutputJSON';
import {
  AuthServiceSignupOutputTypes
} from './AuthServiceSignupOutputTypes';
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

/**
  * 
  *  Sign up for a service with provided credentials
  * 
  * ADT io.protoforce.guide.auth.authservice.models:SignupOutput
  * 
  * Defined at auth.service.pfm @ 72:3
  */
export class AuthServiceSignupOutput implements WithRTTI, IRTADT<AuthServiceSignupOutputTypes, AuthServiceSignupOutputFlatTypes> {
  value: AuthServiceSignupOutputTypes;
  static readonly RTTI_CLASS: string = 'SignupOutput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authservice.models:SignupOutput';
  
  constructor(value?: {internalError?: InternalError, alreadyExistsError?: AlreadyExistsError}, unambiguous?: AuthServiceSignupOutputTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT AuthServiceSignupOutput must have value provided during instantiation.');
      }
      this.value = unambiguous;
      return;
    }
    if (typeof value.internalError !== 'undefined') {
      this.value = value.internalError;
    } else 
    if (typeof value.alreadyExistsError !== 'undefined') {
      this.value = value.alreadyExistsError;
    } else {
    
      throw new Error('ADT AuthServiceSignupOutput constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): AuthServiceSignupOutputFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: AuthServiceSignupOutputTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: AuthServiceSignupOutputFlatTypes)=> T): T {
    return mapper(this.flatValue);
  }
  
  match<T>(whenInternalError: (value: InternalError)=> T, whenAlreadyExistsError: (value: AlreadyExistsError)=> T): T {
    const v = this.value;
    if (v instanceof InternalError) {
      return whenInternalError(v);
    } else 
    if (v instanceof AlreadyExistsError) {
      return whenAlreadyExistsError(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive match when type is '${typeof v}'`);
  }
  
  flatMatch<T = void>(whenInternalError: (value: InternalError)=> T, whenAlreadyExistsError: (value: AlreadyExistsError)=> T): T {
    const v = this.value;
    if (v instanceof InternalError) {
      return whenInternalError(v);
    } else 
    if (v instanceof AlreadyExistsError) {
      return whenAlreadyExistsError(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive flatMatch when type is '${typeof v}'`);
  }
  
  static fromInternalError(value: InternalError): AuthServiceSignupOutput {
    return new AuthServiceSignupOutput({internalError: value});
  }
  
  static fromAlreadyExistsError(value: AlreadyExistsError): AuthServiceSignupOutput {
    return new AuthServiceSignupOutput({alreadyExistsError: value});
  }
  
  static from(value: AuthServiceSignupOutput | AuthServiceSignupOutputTypes): AuthServiceSignupOutput {
    return value instanceof AuthServiceSignupOutput ? value : new AuthServiceSignupOutput(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return AuthServiceSignupOutput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthServiceSignupOutput.RTTI_FQN;
  }
  
  toJSON(): AuthServiceSignupOutputJSON {
    return AuthServiceSignupOutput.toJSON(this);
  }
  
  static toJSON = (value: AuthServiceSignupOutput): AuthServiceSignupOutputJSON => {
    const v = value.value;
    if (v instanceof InternalError) {
      return JSONConverter.withTypeNested(v, 'InternalError');
    } else 
    if (v instanceof AlreadyExistsError) {
      return JSONConverter.withTypeNested(v, 'AlreadyExistsError');
    } else {
      throw new CodecError('Inconsistent ADT internal type, value: ' + v);
    }
  }
  
  static fromJSON = (value: AuthServiceSignupOutputJSON): AuthServiceSignupOutput => {
    const key = Object.keys(value)[0];
    const val = value[key];
    switch (key) {
      case 'InternalError': {
        const vc = val as InternalErrorJSON;
        return AuthServiceSignupOutput.fromInternalError(InternalError.fromJSON(vc));
      }
      case 'AlreadyExistsError': {
        const vc = val as AlreadyExistsErrorJSON;
        return AuthServiceSignupOutput.fromAlreadyExistsError(AlreadyExistsError.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'SignupOutput'`);
    }
  }
  
}