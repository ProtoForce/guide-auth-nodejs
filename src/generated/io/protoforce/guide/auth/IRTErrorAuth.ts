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
  IRTErrorAuthJSON
} from './codecs/IRTErrorAuthJSON';
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
  * Class io.protoforce.guide.auth:IRTErrorAuth
  */
export class IRTErrorAuth extends RuntimeError implements WithRTTI {
  message: string;
  static readonly RTTI_CLASS: string = 'IRTErrorAuth';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:IRTErrorAuth';
  
  constructor(data: {message: string}, skipDefaults?: boolean | undefined) {
    super({message: data.message})
    
    this.message = data.message;
  }
  
  get RTTI_CLASS(): string {
    return IRTErrorAuth.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return IRTErrorAuth.RTTI_FQN;
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
  
  toAlreadyExistsError(): AlreadyExistsError {
    return new AlreadyExistsError({
      message: this.message
    });
  }
  
  toForbiddenError(): ForbiddenError {
    return new ForbiddenError({
      message: this.message
    });
  }
  
  toJSON(): IRTErrorAuthJSON {
    return IRTErrorAuth.toJSON(this);
  }
  
  static toJSON = (value: IRTErrorAuth): IRTErrorAuthJSON => {
    return {
      message: value.message
    };
  }
  
  static fromJSON = (value: IRTErrorAuthJSON): IRTErrorAuth => {
    return new IRTErrorAuth({
      message: value.message
    });
  }
  
}