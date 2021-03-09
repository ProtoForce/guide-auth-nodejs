// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  AlreadyExistsErrorJSON
} from './codecs/AlreadyExistsErrorJSON';
import {
  ForbiddenError
} from './ForbiddenError';
import {
  IRTErrorAuth
} from './IRTErrorAuth';
import {
  InternalError
} from './InternalError';
import {
  NotFoundError
} from './NotFoundError';
import {
  WithRTTI,
  RuntimeError
} from '../../../../irt';

/**
  * 
  *  Already Exists Error: an entity already exists
  * 
  * Class io.protoforce.guide.auth:AlreadyExistsError
  * 
  * Defined at errors.pfm @ 22:1
  */
export class AlreadyExistsError extends RuntimeError implements WithRTTI {
  message: string;
  static readonly RTTI_CLASS: string = 'AlreadyExistsError';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:AlreadyExistsError';
  
  constructor(data: {message: string}) {
    super({message: data.message})
    
    this.message = data.message;
  }
  
  get RTTI_CLASS(): string {
    return AlreadyExistsError.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AlreadyExistsError.RTTI_FQN;
  }
  
  toNotFoundError(): NotFoundError {
    return new NotFoundError({
      message: this.message
    });
  }
  
  toInternalError(): InternalError {
    return new InternalError({
      message: this.message
    });
  }
  
  toForbiddenError(): ForbiddenError {
    return new ForbiddenError({
      message: this.message
    });
  }
  
  toIRTErrorAuth(): IRTErrorAuth {
    return new IRTErrorAuth({
      message: this.message
    });
  }
  
  toJSON(): AlreadyExistsErrorJSON {
    return AlreadyExistsError.toJSON(this);
  }
  
  static toJSON = (value: AlreadyExistsError): AlreadyExistsErrorJSON => {
    return {
      message: value.message
    };
  }
  
  static fromJSON = (value: AlreadyExistsErrorJSON): AlreadyExistsError => {
    return new AlreadyExistsError({
      message: value.message
    });
  }
  
}