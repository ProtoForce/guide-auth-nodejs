// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceConfirmEmailOutputFlatTypes
} from './AuthServiceConfirmEmailOutputFlatTypes';
import {
  AuthServiceConfirmEmailOutputJSON
} from '../../codecs/authservice/models/AuthServiceConfirmEmailOutputJSON';
import {
  AuthServiceConfirmEmailOutputTypes
} from './AuthServiceConfirmEmailOutputTypes';
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
  *  Confirm email
  * 
  * ADT io.protoforce.guide.auth.authservice.models:ConfirmEmailOutput
  * 
  * Defined at auth.service.pfm @ 82:3
  */
export class AuthServiceConfirmEmailOutput implements WithRTTI, IRTADT<AuthServiceConfirmEmailOutputTypes, AuthServiceConfirmEmailOutputFlatTypes> {
  value: AuthServiceConfirmEmailOutputTypes;
  static readonly RTTI_CLASS: string = 'ConfirmEmailOutput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authservice.models:ConfirmEmailOutput';
  
  constructor(value?: {internalError?: InternalError, notFoundError?: NotFoundError}, unambiguous?: AuthServiceConfirmEmailOutputTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT AuthServiceConfirmEmailOutput must have value provided during instantiation.');
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
    
      throw new Error('ADT AuthServiceConfirmEmailOutput constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): AuthServiceConfirmEmailOutputFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: AuthServiceConfirmEmailOutputTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: AuthServiceConfirmEmailOutputFlatTypes)=> T): T {
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
  
  static fromInternalError(value: InternalError): AuthServiceConfirmEmailOutput {
    return new AuthServiceConfirmEmailOutput({internalError: value});
  }
  
  static fromNotFoundError(value: NotFoundError): AuthServiceConfirmEmailOutput {
    return new AuthServiceConfirmEmailOutput({notFoundError: value});
  }
  
  static from(value: AuthServiceConfirmEmailOutput | AuthServiceConfirmEmailOutputTypes): AuthServiceConfirmEmailOutput {
    return value instanceof AuthServiceConfirmEmailOutput ? value : new AuthServiceConfirmEmailOutput(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return AuthServiceConfirmEmailOutput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthServiceConfirmEmailOutput.RTTI_FQN;
  }
  
  toJSON(): AuthServiceConfirmEmailOutputJSON {
    return AuthServiceConfirmEmailOutput.toJSON(this);
  }
  
  static toJSON = (value: AuthServiceConfirmEmailOutput): AuthServiceConfirmEmailOutputJSON => {
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
  
  static fromJSON = (value: AuthServiceConfirmEmailOutputJSON): AuthServiceConfirmEmailOutput => {
    const key = Object.keys(value)[0];
    const val = value[key];
    switch (key) {
      case 'InternalError': {
        const vc = val as InternalErrorJSON;
        return AuthServiceConfirmEmailOutput.fromInternalError(InternalError.fromJSON(vc));
      }
      case 'NotFoundError': {
        const vc = val as NotFoundErrorJSON;
        return AuthServiceConfirmEmailOutput.fromNotFoundError(NotFoundError.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'ConfirmEmailOutput'`);
    }
  }
  
}