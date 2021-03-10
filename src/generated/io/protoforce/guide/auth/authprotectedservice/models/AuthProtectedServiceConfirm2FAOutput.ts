// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceConfirm2FAOutputFlatTypes
} from './AuthProtectedServiceConfirm2FAOutputFlatTypes';
import {
  AuthProtectedServiceConfirm2FAOutputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceConfirm2FAOutputJSON';
import {
  AuthProtectedServiceConfirm2FAOutputTypes
} from './AuthProtectedServiceConfirm2FAOutputTypes';
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
  *  Confirm two factor authentication
  * 
  * ADT io.protoforce.guide.auth.authprotectedservice.models:Confirm2FAOutput
  * 
  * Defined at auth.service.pfm @ 115:3
  */
export class AuthProtectedServiceConfirm2FAOutput implements WithRTTI, IRTADT<AuthProtectedServiceConfirm2FAOutputTypes, AuthProtectedServiceConfirm2FAOutputFlatTypes> {
  value: AuthProtectedServiceConfirm2FAOutputTypes;
  static readonly RTTI_CLASS: string = 'Confirm2FAOutput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authprotectedservice.models:Confirm2FAOutput';
  
  constructor(value?: {internalError?: InternalError, forbiddenError?: ForbiddenError}, unambiguous?: AuthProtectedServiceConfirm2FAOutputTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT AuthProtectedServiceConfirm2FAOutput must have value provided during instantiation.');
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
    
      throw new Error('ADT AuthProtectedServiceConfirm2FAOutput constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): AuthProtectedServiceConfirm2FAOutputFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: AuthProtectedServiceConfirm2FAOutputTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: AuthProtectedServiceConfirm2FAOutputFlatTypes)=> T): T {
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
  
  static fromInternalError(value: InternalError): AuthProtectedServiceConfirm2FAOutput {
    return new AuthProtectedServiceConfirm2FAOutput({internalError: value});
  }
  
  static fromForbiddenError(value: ForbiddenError): AuthProtectedServiceConfirm2FAOutput {
    return new AuthProtectedServiceConfirm2FAOutput({forbiddenError: value});
  }
  
  static from(value: AuthProtectedServiceConfirm2FAOutput | AuthProtectedServiceConfirm2FAOutputTypes): AuthProtectedServiceConfirm2FAOutput {
    return value instanceof AuthProtectedServiceConfirm2FAOutput ? value : new AuthProtectedServiceConfirm2FAOutput(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return AuthProtectedServiceConfirm2FAOutput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthProtectedServiceConfirm2FAOutput.RTTI_FQN;
  }
  
  toJSON(): AuthProtectedServiceConfirm2FAOutputJSON {
    return AuthProtectedServiceConfirm2FAOutput.toJSON(this);
  }
  
  static toJSON = (value: AuthProtectedServiceConfirm2FAOutput): AuthProtectedServiceConfirm2FAOutputJSON => {
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
  
  static fromJSON = (value: AuthProtectedServiceConfirm2FAOutputJSON): AuthProtectedServiceConfirm2FAOutput => {
    const key = Object.keys(value)[0];
    const val = value[key];
    switch (key) {
      case 'InternalError': {
        const vc = val as InternalErrorJSON;
        return AuthProtectedServiceConfirm2FAOutput.fromInternalError(InternalError.fromJSON(vc));
      }
      case 'ForbiddenError': {
        const vc = val as ForbiddenErrorJSON;
        return AuthProtectedServiceConfirm2FAOutput.fromForbiddenError(ForbiddenError.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'Confirm2FAOutput'`);
    }
  }
  
}