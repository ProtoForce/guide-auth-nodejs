// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceRequest2FAOutputFlatTypes
} from './AuthProtectedServiceRequest2FAOutputFlatTypes';
import {
  AuthProtectedServiceRequest2FAOutputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceRequest2FAOutputJSON';
import {
  AuthProtectedServiceRequest2FAOutputTypes
} from './AuthProtectedServiceRequest2FAOutputTypes';
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
  *  Request two factor authentication
  * 
  * ADT io.protoforce.guide.auth.authprotectedservice.models:Request2FAOutput
  * 
  * Defined at auth.service.pfm @ 110:3
  */
export class AuthProtectedServiceRequest2FAOutput implements WithRTTI, IRTADT<AuthProtectedServiceRequest2FAOutputTypes, AuthProtectedServiceRequest2FAOutputFlatTypes> {
  value: AuthProtectedServiceRequest2FAOutputTypes;
  static readonly RTTI_CLASS: string = 'Request2FAOutput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authprotectedservice.models:Request2FAOutput';
  
  constructor(value?: {internalError?: InternalError, forbiddenError?: ForbiddenError}, unambiguous?: AuthProtectedServiceRequest2FAOutputTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT AuthProtectedServiceRequest2FAOutput must have value provided during instantiation.');
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
    
      throw new Error('ADT AuthProtectedServiceRequest2FAOutput constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): AuthProtectedServiceRequest2FAOutputFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: AuthProtectedServiceRequest2FAOutputTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: AuthProtectedServiceRequest2FAOutputFlatTypes)=> T): T {
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
  
  static fromInternalError(value: InternalError): AuthProtectedServiceRequest2FAOutput {
    return new AuthProtectedServiceRequest2FAOutput({internalError: value});
  }
  
  static fromForbiddenError(value: ForbiddenError): AuthProtectedServiceRequest2FAOutput {
    return new AuthProtectedServiceRequest2FAOutput({forbiddenError: value});
  }
  
  static from(value: AuthProtectedServiceRequest2FAOutput | AuthProtectedServiceRequest2FAOutputTypes): AuthProtectedServiceRequest2FAOutput {
    return value instanceof AuthProtectedServiceRequest2FAOutput ? value : new AuthProtectedServiceRequest2FAOutput(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return AuthProtectedServiceRequest2FAOutput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthProtectedServiceRequest2FAOutput.RTTI_FQN;
  }
  
  toJSON(): AuthProtectedServiceRequest2FAOutputJSON {
    return AuthProtectedServiceRequest2FAOutput.toJSON(this);
  }
  
  static toJSON = (value: AuthProtectedServiceRequest2FAOutput): AuthProtectedServiceRequest2FAOutputJSON => {
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
  
  static fromJSON = (value: AuthProtectedServiceRequest2FAOutputJSON): AuthProtectedServiceRequest2FAOutput => {
    const key = Object.keys(value)[0];
    const val = value[key];
    switch (key) {
      case 'InternalError': {
        const vc = val as InternalErrorJSON;
        return AuthProtectedServiceRequest2FAOutput.fromInternalError(InternalError.fromJSON(vc));
      }
      case 'ForbiddenError': {
        const vc = val as ForbiddenErrorJSON;
        return AuthProtectedServiceRequest2FAOutput.fromForbiddenError(ForbiddenError.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'Request2FAOutput'`);
    }
  }
  
}