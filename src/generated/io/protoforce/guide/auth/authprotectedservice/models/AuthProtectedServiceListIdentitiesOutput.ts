// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceListIdentitiesOutputFlatTypes
} from './AuthProtectedServiceListIdentitiesOutputFlatTypes';
import {
  AuthProtectedServiceListIdentitiesOutputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceListIdentitiesOutputJSON';
import {
  AuthProtectedServiceListIdentitiesOutputTypes
} from './AuthProtectedServiceListIdentitiesOutputTypes';
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
  *  List known identities
  * 
  * ADT io.protoforce.guide.auth.authprotectedservice.models:ListIdentitiesOutput
  * 
  * Defined at auth.service.pfm @ 135:3
  */
export class AuthProtectedServiceListIdentitiesOutput implements WithRTTI, IRTADT<AuthProtectedServiceListIdentitiesOutputTypes, AuthProtectedServiceListIdentitiesOutputFlatTypes> {
  value: AuthProtectedServiceListIdentitiesOutputTypes;
  static readonly RTTI_CLASS: string = 'ListIdentitiesOutput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authprotectedservice.models:ListIdentitiesOutput';
  
  constructor(value?: {internalError?: InternalError, forbiddenError?: ForbiddenError}, unambiguous?: AuthProtectedServiceListIdentitiesOutputTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT AuthProtectedServiceListIdentitiesOutput must have value provided during instantiation.');
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
    
      throw new Error('ADT AuthProtectedServiceListIdentitiesOutput constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): AuthProtectedServiceListIdentitiesOutputFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: AuthProtectedServiceListIdentitiesOutputTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: AuthProtectedServiceListIdentitiesOutputFlatTypes)=> T): T {
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
  
  static fromInternalError(value: InternalError): AuthProtectedServiceListIdentitiesOutput {
    return new AuthProtectedServiceListIdentitiesOutput({internalError: value});
  }
  
  static fromForbiddenError(value: ForbiddenError): AuthProtectedServiceListIdentitiesOutput {
    return new AuthProtectedServiceListIdentitiesOutput({forbiddenError: value});
  }
  
  static from(value: AuthProtectedServiceListIdentitiesOutput | AuthProtectedServiceListIdentitiesOutputTypes): AuthProtectedServiceListIdentitiesOutput {
    return value instanceof AuthProtectedServiceListIdentitiesOutput ? value : new AuthProtectedServiceListIdentitiesOutput(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return AuthProtectedServiceListIdentitiesOutput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthProtectedServiceListIdentitiesOutput.RTTI_FQN;
  }
  
  toJSON(): AuthProtectedServiceListIdentitiesOutputJSON {
    return AuthProtectedServiceListIdentitiesOutput.toJSON(this);
  }
  
  static toJSON = (value: AuthProtectedServiceListIdentitiesOutput): AuthProtectedServiceListIdentitiesOutputJSON => {
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
  
  static fromJSON = (value: AuthProtectedServiceListIdentitiesOutputJSON): AuthProtectedServiceListIdentitiesOutput => {
    const key = Object.keys(value)[0];
    const val = value[key];
    switch (key) {
      case 'InternalError': {
        const vc = val as InternalErrorJSON;
        return AuthProtectedServiceListIdentitiesOutput.fromInternalError(InternalError.fromJSON(vc));
      }
      case 'ForbiddenError': {
        const vc = val as ForbiddenErrorJSON;
        return AuthProtectedServiceListIdentitiesOutput.fromForbiddenError(ForbiddenError.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'ListIdentitiesOutput'`);
    }
  }
  
}