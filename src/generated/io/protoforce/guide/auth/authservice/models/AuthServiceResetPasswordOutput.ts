// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceResetPasswordOutputFlatTypes
} from './AuthServiceResetPasswordOutputFlatTypes';
import {
  AuthServiceResetPasswordOutputJSON
} from '../../codecs/authservice/models/AuthServiceResetPasswordOutputJSON';
import {
  AuthServiceResetPasswordOutputTypes
} from './AuthServiceResetPasswordOutputTypes';
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
  *  Reset password
  * 
  * ADT io.protoforce.guide.auth.authservice.models:ResetPasswordOutput
  * 
  * Defined at auth.service.pfm @ 92:3
  */
export class AuthServiceResetPasswordOutput implements WithRTTI, IRTADT<AuthServiceResetPasswordOutputTypes, AuthServiceResetPasswordOutputFlatTypes> {
  value: AuthServiceResetPasswordOutputTypes;
  static readonly RTTI_CLASS: string = 'ResetPasswordOutput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authservice.models:ResetPasswordOutput';
  
  constructor(value?: {internalError?: InternalError, notFoundError?: NotFoundError}, unambiguous?: AuthServiceResetPasswordOutputTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT AuthServiceResetPasswordOutput must have value provided during instantiation.');
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
    
      throw new Error('ADT AuthServiceResetPasswordOutput constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): AuthServiceResetPasswordOutputFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: AuthServiceResetPasswordOutputTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: AuthServiceResetPasswordOutputFlatTypes)=> T): T {
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
  
  static fromInternalError(value: InternalError): AuthServiceResetPasswordOutput {
    return new AuthServiceResetPasswordOutput({internalError: value});
  }
  
  static fromNotFoundError(value: NotFoundError): AuthServiceResetPasswordOutput {
    return new AuthServiceResetPasswordOutput({notFoundError: value});
  }
  
  static from(value: AuthServiceResetPasswordOutput | AuthServiceResetPasswordOutputTypes): AuthServiceResetPasswordOutput {
    return value instanceof AuthServiceResetPasswordOutput ? value : new AuthServiceResetPasswordOutput(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return AuthServiceResetPasswordOutput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthServiceResetPasswordOutput.RTTI_FQN;
  }
  
  toJSON(): AuthServiceResetPasswordOutputJSON {
    return AuthServiceResetPasswordOutput.toJSON(this);
  }
  
  static toJSON = (value: AuthServiceResetPasswordOutput): AuthServiceResetPasswordOutputJSON => {
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
  
  static fromJSON = (value: AuthServiceResetPasswordOutputJSON): AuthServiceResetPasswordOutput => {
    const key = Object.keys(value)[0];
    const val = value[key];
    switch (key) {
      case 'InternalError': {
        const vc = val as InternalErrorJSON;
        return AuthServiceResetPasswordOutput.fromInternalError(InternalError.fromJSON(vc));
      }
      case 'NotFoundError': {
        const vc = val as NotFoundErrorJSON;
        return AuthServiceResetPasswordOutput.fromNotFoundError(NotFoundError.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'ResetPasswordOutput'`);
    }
  }
  
}