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
  InternalErrorJSON
} from './codecs/InternalErrorJSON';
import {
  NotFoundError
} from './NotFoundError';
import {
  WithRTTI,
  RuntimeError
} from '../../../../irt';

/**
  * 
  *  Server Internal Error: returned when something goes wrong on the backend
  *  as a result of infrastructure problems, or some other unexpected exceptions.
  * 
  * Class io.protoforce.guide.auth:InternalError
  * 
  * Defined at errors.pfm @ 6:1
  */
export class InternalError extends RuntimeError implements WithRTTI {
  message: string;
  static readonly RTTI_CLASS: string = 'InternalError';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:InternalError';
  
  constructor(data: {message: string}, skipDefaults?: boolean | undefined) {
    super({message: data.message})
    
    this.message = data.message;
  }
  
  get RTTI_CLASS(): string {
    return InternalError.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return InternalError.RTTI_FQN;
  }
  
  toNotFoundError(): NotFoundError {
    return new NotFoundError({
      message: this.message
    });
  }
  
  toIRTErrorAuth(): IRTErrorAuth {
    return new IRTErrorAuth({
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
  
  toJSON(): InternalErrorJSON {
    return InternalError.toJSON(this);
  }
  
  static toJSON = (value: InternalError): InternalErrorJSON => {
    return {
      message: value.message
    };
  }
  
  static fromJSON = (value: InternalErrorJSON): InternalError => {
    return new InternalError({
      message: value.message
    });
  }
  
}