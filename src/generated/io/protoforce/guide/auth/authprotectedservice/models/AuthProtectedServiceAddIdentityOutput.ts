// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AlreadyExistsError
} from '../../AlreadyExistsError';
import {
  AlreadyExistsErrorJSON
} from '../../codecs/AlreadyExistsErrorJSON';
import {
  AuthProtectedServiceAddIdentityOutputFlatTypes
} from './AuthProtectedServiceAddIdentityOutputFlatTypes';
import {
  AuthProtectedServiceAddIdentityOutputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceAddIdentityOutputJSON';
import {
  AuthProtectedServiceAddIdentityOutputTypes
} from './AuthProtectedServiceAddIdentityOutputTypes';
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
  *  Add secondary identity
  * 
  * ADT io.protoforce.guide.auth.authprotectedservice.models:AddIdentityOutput
  * 
  * Defined at auth.service.pfm @ 125:3
  */
export class AuthProtectedServiceAddIdentityOutput implements WithRTTI, IRTADT<AuthProtectedServiceAddIdentityOutputTypes, AuthProtectedServiceAddIdentityOutputFlatTypes> {
  value: AuthProtectedServiceAddIdentityOutputTypes;
  static readonly RTTI_CLASS: string = 'AddIdentityOutput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authprotectedservice.models:AddIdentityOutput';
  
  constructor(value?: {internalError?: InternalError, forbiddenError?: ForbiddenError, alreadyExistsError?: AlreadyExistsError}, unambiguous?: AuthProtectedServiceAddIdentityOutputTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT AuthProtectedServiceAddIdentityOutput must have value provided during instantiation.');
      }
      this.value = unambiguous;
      return;
    }
    if (typeof value.internalError !== 'undefined') {
      this.value = value.internalError;
    } else 
    if (typeof value.forbiddenError !== 'undefined') {
      this.value = value.forbiddenError;
    } else 
    if (typeof value.alreadyExistsError !== 'undefined') {
      this.value = value.alreadyExistsError;
    } else {
    
      throw new Error('ADT AuthProtectedServiceAddIdentityOutput constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): AuthProtectedServiceAddIdentityOutputFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: AuthProtectedServiceAddIdentityOutputTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: AuthProtectedServiceAddIdentityOutputFlatTypes)=> T): T {
    return mapper(this.flatValue);
  }
  
  match<T>(whenInternalError: (value: InternalError)=> T, whenForbiddenError: (value: ForbiddenError)=> T, whenAlreadyExistsError: (value: AlreadyExistsError)=> T): T {
    const v = this.value;
    if (v instanceof InternalError) {
      return whenInternalError(v);
    } else 
    if (v instanceof ForbiddenError) {
      return whenForbiddenError(v);
    } else 
    if (v instanceof AlreadyExistsError) {
      return whenAlreadyExistsError(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive match when type is '${typeof v}'`);
  }
  
  flatMatch<T = void>(whenInternalError: (value: InternalError)=> T, whenForbiddenError: (value: ForbiddenError)=> T, whenAlreadyExistsError: (value: AlreadyExistsError)=> T): T {
    const v = this.value;
    if (v instanceof InternalError) {
      return whenInternalError(v);
    } else 
    if (v instanceof ForbiddenError) {
      return whenForbiddenError(v);
    } else 
    if (v instanceof AlreadyExistsError) {
      return whenAlreadyExistsError(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive flatMatch when type is '${typeof v}'`);
  }
  
  static fromInternalError(value: InternalError): AuthProtectedServiceAddIdentityOutput {
    return new AuthProtectedServiceAddIdentityOutput({internalError: value});
  }
  
  static fromForbiddenError(value: ForbiddenError): AuthProtectedServiceAddIdentityOutput {
    return new AuthProtectedServiceAddIdentityOutput({forbiddenError: value});
  }
  
  static fromAlreadyExistsError(value: AlreadyExistsError): AuthProtectedServiceAddIdentityOutput {
    return new AuthProtectedServiceAddIdentityOutput({alreadyExistsError: value});
  }
  
  static from(value: AuthProtectedServiceAddIdentityOutput | AuthProtectedServiceAddIdentityOutputTypes): AuthProtectedServiceAddIdentityOutput {
    return value instanceof AuthProtectedServiceAddIdentityOutput ? value : new AuthProtectedServiceAddIdentityOutput(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return AuthProtectedServiceAddIdentityOutput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthProtectedServiceAddIdentityOutput.RTTI_FQN;
  }
  
  toJSON(): AuthProtectedServiceAddIdentityOutputJSON {
    return AuthProtectedServiceAddIdentityOutput.toJSON(this);
  }
  
  static toJSON = (value: AuthProtectedServiceAddIdentityOutput): AuthProtectedServiceAddIdentityOutputJSON => {
    const v = value.value;
    if (v instanceof InternalError) {
      return JSONConverter.withTypeNested(v, 'InternalError');
    } else 
    if (v instanceof ForbiddenError) {
      return JSONConverter.withTypeNested(v, 'ForbiddenError');
    } else 
    if (v instanceof AlreadyExistsError) {
      return JSONConverter.withTypeNested(v, 'AlreadyExistsError');
    } else {
      throw new CodecError('Inconsistent ADT internal type, value: ' + v);
    }
  }
  
  static fromJSON = (value: AuthProtectedServiceAddIdentityOutputJSON): AuthProtectedServiceAddIdentityOutput => {
    const key = Object.keys(value)[0];
    const val = value[key];
    switch (key) {
      case 'InternalError': {
        const vc = val as InternalErrorJSON;
        return AuthProtectedServiceAddIdentityOutput.fromInternalError(InternalError.fromJSON(vc));
      }
      case 'ForbiddenError': {
        const vc = val as ForbiddenErrorJSON;
        return AuthProtectedServiceAddIdentityOutput.fromForbiddenError(ForbiddenError.fromJSON(vc));
      }
      case 'AlreadyExistsError': {
        const vc = val as AlreadyExistsErrorJSON;
        return AuthProtectedServiceAddIdentityOutput.fromAlreadyExistsError(AlreadyExistsError.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'AddIdentityOutput'`);
    }
  }
  
}