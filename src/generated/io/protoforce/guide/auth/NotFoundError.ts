// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  AlreadyExistsError
} from './AlreadyExistsError';
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
  NotFoundErrorJSON
} from './codecs/NotFoundErrorJSON';
import {
  WithRTTI,
  RuntimeError
} from '../../../../irt';

/**
  * 
  *  Not Found Error: returned when an entity requested is not found
  * 
  * Class io.protoforce.guide.auth:NotFoundError
  * 
  * Defined at errors.pfm @ 14:1
  */
export class NotFoundError extends RuntimeError implements WithRTTI {
  message: string;
  static readonly RTTI_CLASS: string = 'NotFoundError';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:NotFoundError';
  
  constructor(data: {message: string}) {
    super({message: data.message})
    
    this.message = data.message;
  }
  
  get RTTI_CLASS(): string {
    return NotFoundError.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return NotFoundError.RTTI_FQN;
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
  
  toAlreadyExistsError(): AlreadyExistsError {
    return new AlreadyExistsError({
      message: this.message
    });
  }
  
  toIRTErrorAuth(): IRTErrorAuth {
    return new IRTErrorAuth({
      message: this.message
    });
  }
  
  toJSON(): NotFoundErrorJSON {
    return NotFoundError.toJSON(this);
  }
  
  static toJSON = (value: NotFoundError): NotFoundErrorJSON => {
    return {
      message: value.message
    };
  }
  
  static fromJSON = (value: NotFoundErrorJSON): NotFoundError => {
    return new NotFoundError({
      message: value.message
    });
  }
  
}