// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceRemoveIdentityOutputFlatTypes
} from './AuthProtectedServiceRemoveIdentityOutputFlatTypes';
import {
  AuthProtectedServiceRemoveIdentityOutputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceRemoveIdentityOutputJSON';
import {
  AuthProtectedServiceRemoveIdentityOutputTypes
} from './AuthProtectedServiceRemoveIdentityOutputTypes';
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
import {
  NotFoundError
} from '../../NotFoundError';
import {
  NotFoundErrorJSON
} from '../../codecs/NotFoundErrorJSON';

/**
  * 
  *  Remove secondary identity
  * 
  * ADT io.protoforce.guide.auth.authprotectedservice.models:RemoveIdentityOutput
  * 
  * Defined at auth.service.pfm @ 131:3
  */
export class AuthProtectedServiceRemoveIdentityOutput implements WithRTTI, IRTADT<AuthProtectedServiceRemoveIdentityOutputTypes, AuthProtectedServiceRemoveIdentityOutputFlatTypes> {
  value: AuthProtectedServiceRemoveIdentityOutputTypes;
  static readonly RTTI_CLASS: string = 'RemoveIdentityOutput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authprotectedservice.models:RemoveIdentityOutput';
  
  constructor(value?: {internalError?: InternalError, forbiddenError?: ForbiddenError, notFoundError?: NotFoundError}, unambiguous?: AuthProtectedServiceRemoveIdentityOutputTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT AuthProtectedServiceRemoveIdentityOutput must have value provided during instantiation.');
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
    if (typeof value.notFoundError !== 'undefined') {
      this.value = value.notFoundError;
    } else {
    
      throw new Error('ADT AuthProtectedServiceRemoveIdentityOutput constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): AuthProtectedServiceRemoveIdentityOutputFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: AuthProtectedServiceRemoveIdentityOutputTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: AuthProtectedServiceRemoveIdentityOutputFlatTypes)=> T): T {
    return mapper(this.flatValue);
  }
  
  match<T>(whenInternalError: (value: InternalError)=> T, whenForbiddenError: (value: ForbiddenError)=> T, whenNotFoundError: (value: NotFoundError)=> T): T {
    const v = this.value;
    if (v instanceof InternalError) {
      return whenInternalError(v);
    } else 
    if (v instanceof ForbiddenError) {
      return whenForbiddenError(v);
    } else 
    if (v instanceof NotFoundError) {
      return whenNotFoundError(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive match when type is '${typeof v}'`);
  }
  
  flatMatch<T = void>(whenInternalError: (value: InternalError)=> T, whenForbiddenError: (value: ForbiddenError)=> T, whenNotFoundError: (value: NotFoundError)=> T): T {
    const v = this.value;
    if (v instanceof InternalError) {
      return whenInternalError(v);
    } else 
    if (v instanceof ForbiddenError) {
      return whenForbiddenError(v);
    } else 
    if (v instanceof NotFoundError) {
      return whenNotFoundError(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive flatMatch when type is '${typeof v}'`);
  }
  
  static fromInternalError(value: InternalError): AuthProtectedServiceRemoveIdentityOutput {
    return new AuthProtectedServiceRemoveIdentityOutput({internalError: value});
  }
  
  static fromForbiddenError(value: ForbiddenError): AuthProtectedServiceRemoveIdentityOutput {
    return new AuthProtectedServiceRemoveIdentityOutput({forbiddenError: value});
  }
  
  static fromNotFoundError(value: NotFoundError): AuthProtectedServiceRemoveIdentityOutput {
    return new AuthProtectedServiceRemoveIdentityOutput({notFoundError: value});
  }
  
  static from(value: AuthProtectedServiceRemoveIdentityOutput | AuthProtectedServiceRemoveIdentityOutputTypes): AuthProtectedServiceRemoveIdentityOutput {
    return value instanceof AuthProtectedServiceRemoveIdentityOutput ? value : new AuthProtectedServiceRemoveIdentityOutput(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return AuthProtectedServiceRemoveIdentityOutput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthProtectedServiceRemoveIdentityOutput.RTTI_FQN;
  }
  
  toJSON(): AuthProtectedServiceRemoveIdentityOutputJSON {
    return AuthProtectedServiceRemoveIdentityOutput.toJSON(this);
  }
  
  static toJSON = (value: AuthProtectedServiceRemoveIdentityOutput): AuthProtectedServiceRemoveIdentityOutputJSON => {
    const v = value.value;
    if (v instanceof InternalError) {
      return JSONConverter.withTypeNested(v, 'InternalError');
    } else 
    if (v instanceof ForbiddenError) {
      return JSONConverter.withTypeNested(v, 'ForbiddenError');
    } else 
    if (v instanceof NotFoundError) {
      return JSONConverter.withTypeNested(v, 'NotFoundError');
    } else {
      throw new CodecError('Inconsistent ADT internal type, value: ' + v);
    }
  }
  
  static fromJSON = (value: AuthProtectedServiceRemoveIdentityOutputJSON): AuthProtectedServiceRemoveIdentityOutput => {
    const key = Object.keys(value)[0];
    const val = value[key];
    switch (key) {
      case 'InternalError': {
        const vc = val as InternalErrorJSON;
        return AuthProtectedServiceRemoveIdentityOutput.fromInternalError(InternalError.fromJSON(vc));
      }
      case 'ForbiddenError': {
        const vc = val as ForbiddenErrorJSON;
        return AuthProtectedServiceRemoveIdentityOutput.fromForbiddenError(ForbiddenError.fromJSON(vc));
      }
      case 'NotFoundError': {
        const vc = val as NotFoundErrorJSON;
        return AuthProtectedServiceRemoveIdentityOutput.fromNotFoundError(NotFoundError.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'RemoveIdentityOutput'`);
    }
  }
  
}