// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceConfirmPhoneOutputFlatTypes
} from './AuthServiceConfirmPhoneOutputFlatTypes';
import {
  AuthServiceConfirmPhoneOutputJSON
} from '../../codecs/authservice/models/AuthServiceConfirmPhoneOutputJSON';
import {
  AuthServiceConfirmPhoneOutputTypes
} from './AuthServiceConfirmPhoneOutputTypes';
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
  *  Confirm phone number
  * 
  * ADT io.protoforce.guide.auth.authservice.models:ConfirmPhoneOutput
  * 
  * Defined at auth.service.pfm @ 88:3
  */
export class AuthServiceConfirmPhoneOutput implements WithRTTI, IRTADT<AuthServiceConfirmPhoneOutputTypes, AuthServiceConfirmPhoneOutputFlatTypes> {
  value: AuthServiceConfirmPhoneOutputTypes;
  static readonly RTTI_CLASS: string = 'ConfirmPhoneOutput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authservice.models:ConfirmPhoneOutput';
  
  constructor(value?: {internalError?: InternalError, notFoundError?: NotFoundError}, unambiguous?: AuthServiceConfirmPhoneOutputTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT AuthServiceConfirmPhoneOutput must have value provided during instantiation.');
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
    
      throw new Error('ADT AuthServiceConfirmPhoneOutput constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): AuthServiceConfirmPhoneOutputFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: AuthServiceConfirmPhoneOutputTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: AuthServiceConfirmPhoneOutputFlatTypes)=> T): T {
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
  
  static fromInternalError(value: InternalError): AuthServiceConfirmPhoneOutput {
    return new AuthServiceConfirmPhoneOutput({internalError: value});
  }
  
  static fromNotFoundError(value: NotFoundError): AuthServiceConfirmPhoneOutput {
    return new AuthServiceConfirmPhoneOutput({notFoundError: value});
  }
  
  static from(value: AuthServiceConfirmPhoneOutput | AuthServiceConfirmPhoneOutputTypes): AuthServiceConfirmPhoneOutput {
    return value instanceof AuthServiceConfirmPhoneOutput ? value : new AuthServiceConfirmPhoneOutput(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return AuthServiceConfirmPhoneOutput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthServiceConfirmPhoneOutput.RTTI_FQN;
  }
  
  toJSON(): AuthServiceConfirmPhoneOutputJSON {
    return AuthServiceConfirmPhoneOutput.toJSON(this);
  }
  
  static toJSON = (value: AuthServiceConfirmPhoneOutput): AuthServiceConfirmPhoneOutputJSON => {
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
  
  static fromJSON = (value: AuthServiceConfirmPhoneOutputJSON): AuthServiceConfirmPhoneOutput => {
    const key = Object.keys(value)[0];
    const val = value[key];
    switch (key) {
      case 'InternalError': {
        const vc = val as InternalErrorJSON;
        return AuthServiceConfirmPhoneOutput.fromInternalError(InternalError.fromJSON(vc));
      }
      case 'NotFoundError': {
        const vc = val as NotFoundErrorJSON;
        return AuthServiceConfirmPhoneOutput.fromNotFoundError(NotFoundError.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'ConfirmPhoneOutput'`);
    }
  }
  
}