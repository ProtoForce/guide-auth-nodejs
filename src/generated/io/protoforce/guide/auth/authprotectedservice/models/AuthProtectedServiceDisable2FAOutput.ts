// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceDisable2FAOutputFlatTypes
} from './AuthProtectedServiceDisable2FAOutputFlatTypes';
import {
  AuthProtectedServiceDisable2FAOutputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceDisable2FAOutputJSON';
import {
  AuthProtectedServiceDisable2FAOutputTypes
} from './AuthProtectedServiceDisable2FAOutputTypes';
import {
  ForbiddenError
} from '../../ForbiddenError';
import {
  ForbiddenErrorJSON
} from '../../codecs/ForbiddenErrorJSON';
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
  *  Disable two factor authentication
  * 
  * ADT io.protoforce.guide.auth.authprotectedservice.models:Disable2FAOutput
  * 
  * Defined at auth.service.pfm @ 120:3
  */
export class AuthProtectedServiceDisable2FAOutput implements WithRTTI, IRTADT<AuthProtectedServiceDisable2FAOutputTypes, AuthProtectedServiceDisable2FAOutputFlatTypes> {
  value: AuthProtectedServiceDisable2FAOutputTypes;
  static readonly RTTI_CLASS: string = 'Disable2FAOutput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authprotectedservice.models:Disable2FAOutput';
  
  constructor(value?: {internalError?: InternalError, forbiddenError?: ForbiddenError}, unambiguous?: AuthProtectedServiceDisable2FAOutputTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT AuthProtectedServiceDisable2FAOutput must have value provided during instantiation.');
      }
      this.value = unambiguous;
      return;
    }
    if (typeof value.internalError !== 'undefined') {
      this.value = value.internalError;
    } else 
    if (typeof value.forbiddenError !== 'undefined') {
      this.value = value.forbiddenError;
    } else {
    
      throw new Error('ADT AuthProtectedServiceDisable2FAOutput constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): AuthProtectedServiceDisable2FAOutputFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: AuthProtectedServiceDisable2FAOutputTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: AuthProtectedServiceDisable2FAOutputFlatTypes)=> T): T {
    return mapper(this.flatValue);
  }
  
  match<T>(whenInternalError: (value: InternalError)=> T, whenForbiddenError: (value: ForbiddenError)=> T): T {
    const v = this.value;
    if (v instanceof InternalError) {
      return whenInternalError(v);
    } else 
    if (v instanceof ForbiddenError) {
      return whenForbiddenError(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive match when type is '${typeof v}'`);
  }
  
  flatMatch<T = void>(whenInternalError: (value: InternalError)=> T, whenForbiddenError: (value: ForbiddenError)=> T): T {
    const v = this.value;
    if (v instanceof InternalError) {
      return whenInternalError(v);
    } else 
    if (v instanceof ForbiddenError) {
      return whenForbiddenError(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive flatMatch when type is '${typeof v}'`);
  }
  
  static fromInternalError(value: InternalError): AuthProtectedServiceDisable2FAOutput {
    return new AuthProtectedServiceDisable2FAOutput({internalError: value});
  }
  
  static fromForbiddenError(value: ForbiddenError): AuthProtectedServiceDisable2FAOutput {
    return new AuthProtectedServiceDisable2FAOutput({forbiddenError: value});
  }
  
  static from(value: AuthProtectedServiceDisable2FAOutput | AuthProtectedServiceDisable2FAOutputTypes): AuthProtectedServiceDisable2FAOutput {
    return value instanceof AuthProtectedServiceDisable2FAOutput ? value : new AuthProtectedServiceDisable2FAOutput(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return AuthProtectedServiceDisable2FAOutput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthProtectedServiceDisable2FAOutput.RTTI_FQN;
  }
  
  toJSON(): AuthProtectedServiceDisable2FAOutputJSON {
    return AuthProtectedServiceDisable2FAOutput.toJSON(this);
  }
  
  static toJSON = (value: AuthProtectedServiceDisable2FAOutput): AuthProtectedServiceDisable2FAOutputJSON => {
    const v = value.value;
    if (v instanceof InternalError) {
      return JSONConverter.withTypeNested(v, 'InternalError');
    } else 
    if (v instanceof ForbiddenError) {
      return JSONConverter.withTypeNested(v, 'ForbiddenError');
    } else {
      throw new CodecError('Inconsistent ADT internal type, value: ' + v);
    }
  }
  
  static fromJSON = (value: AuthProtectedServiceDisable2FAOutputJSON): AuthProtectedServiceDisable2FAOutput => {
    const key = Object.keys(value)[0];
    const val = value[key];
    switch (key) {
      case 'InternalError': {
        const vc = val as InternalErrorJSON;
        return AuthProtectedServiceDisable2FAOutput.fromInternalError(InternalError.fromJSON(vc));
      }
      case 'ForbiddenError': {
        const vc = val as ForbiddenErrorJSON;
        return AuthProtectedServiceDisable2FAOutput.fromForbiddenError(ForbiddenError.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'Disable2FAOutput'`);
    }
  }
  
}