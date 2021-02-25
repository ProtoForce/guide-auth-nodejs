// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  AlreadyExistsError
} from './AlreadyExistsError';
import {
  ForbiddenErrorJSON
} from './codecs/ForbiddenErrorJSON';
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
  *  Forbidden Error: whenever a user is not authorized to use a method
  * 
  * Class io.protoforce.guide.auth:ForbiddenError
  * 
  * Defined at errors.pfm @ 30:1
  */
export class ForbiddenError extends RuntimeError implements WithRTTI {
  message: string;
  static readonly RTTI_CLASS: string = 'ForbiddenError';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:ForbiddenError';
  
  constructor(data: {message: string}, skipDefaults?: boolean | undefined) {
    super({message: data.message})
    
    this.message = data.message;
  }
  
  get RTTI_CLASS(): string {
    return ForbiddenError.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return ForbiddenError.RTTI_FQN;
  }
  
  toAlreadyExistsError(): AlreadyExistsError {
    return new AlreadyExistsError({
      message: this.message
    });
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
  
  toIRTErrorAuth(): IRTErrorAuth {
    return new IRTErrorAuth({
      message: this.message
    });
  }
  
  toJSON(): ForbiddenErrorJSON {
    return ForbiddenError.toJSON(this);
  }
  
  static toJSON = (value: ForbiddenError): ForbiddenErrorJSON => {
    return {
      message: value.message
    };
  }
  
  static fromJSON = (value: ForbiddenErrorJSON): ForbiddenError => {
    return new ForbiddenError({
      message: value.message
    });
  }
  
}