// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceChangePasswordOutputFlatTypes
} from './AuthServiceChangePasswordOutputFlatTypes';
import {
  AuthServiceChangePasswordOutputJSON
} from '../../codecs/authservice/models/AuthServiceChangePasswordOutputJSON';
import {
  AuthServiceChangePasswordOutputTypes
} from './AuthServiceChangePasswordOutputTypes';
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
  *  Change password
  * 
  * ADT io.protoforce.guide.auth.authservice.models:ChangePasswordOutput
  * 
  * Defined at auth.service.pfm @ 98:3
  */
export class AuthServiceChangePasswordOutput implements WithRTTI, IRTADT<AuthServiceChangePasswordOutputTypes, AuthServiceChangePasswordOutputFlatTypes> {
  value: AuthServiceChangePasswordOutputTypes;
  static readonly RTTI_CLASS: string = 'ChangePasswordOutput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authservice.models:ChangePasswordOutput';
  
  constructor(value?: {internalError?: InternalError, notFoundError?: NotFoundError}, unambiguous?: AuthServiceChangePasswordOutputTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT AuthServiceChangePasswordOutput must have value provided during instantiation.');
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
    
      throw new Error('ADT AuthServiceChangePasswordOutput constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): AuthServiceChangePasswordOutputFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: AuthServiceChangePasswordOutputTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: AuthServiceChangePasswordOutputFlatTypes)=> T): T {
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
  
  static fromInternalError(value: InternalError): AuthServiceChangePasswordOutput {
    return new AuthServiceChangePasswordOutput({internalError: value});
  }
  
  static fromNotFoundError(value: NotFoundError): AuthServiceChangePasswordOutput {
    return new AuthServiceChangePasswordOutput({notFoundError: value});
  }
  
  static from(value: AuthServiceChangePasswordOutput | AuthServiceChangePasswordOutputTypes): AuthServiceChangePasswordOutput {
    return value instanceof AuthServiceChangePasswordOutput ? value : new AuthServiceChangePasswordOutput(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return AuthServiceChangePasswordOutput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthServiceChangePasswordOutput.RTTI_FQN;
  }
  
  toJSON(): AuthServiceChangePasswordOutputJSON {
    return AuthServiceChangePasswordOutput.toJSON(this);
  }
  
  static toJSON = (value: AuthServiceChangePasswordOutput): AuthServiceChangePasswordOutputJSON => {
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
  
  static fromJSON = (value: AuthServiceChangePasswordOutputJSON): AuthServiceChangePasswordOutput => {
    const key = Object.keys(value)[0];
    const val = value[key];
    switch (key) {
      case 'InternalError': {
        const vc = val as InternalErrorJSON;
        return AuthServiceChangePasswordOutput.fromInternalError(InternalError.fromJSON(vc));
      }
      case 'NotFoundError': {
        const vc = val as NotFoundErrorJSON;
        return AuthServiceChangePasswordOutput.fromNotFoundError(NotFoundError.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'ChangePasswordOutput'`);
    }
  }
  
}