// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  GenericSuccessJSON
} from './codecs/GenericSuccessJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface GenericSuccessDefn extends WithRTTI {
  message?: string | undefined;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): GenericSuccessJSON;
}

/**
  * 
  *  Generic success structure, with an optional message which can be used
  *  to display some feedback to the user on the action called
  * 
  * Class io.protoforce.guide.auth:GenericSuccess
  * 
  * Defined at auth.service.pfm @ 14:1
  */
export class GenericSuccess implements GenericSuccessDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  message?: string | undefined;
  static readonly RTTI_CLASS: string = 'GenericSuccess';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:GenericSuccess';
  
  constructor(data?: {message?: string | undefined}, skipDefaults?: boolean | undefined) {
    if (!data) {
      return;
    }
    this.message = data.message;
  }
  
  get RTTI_CLASS(): string {
    return GenericSuccess.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return GenericSuccess.RTTI_FQN;
  }
  
  toJSON(): GenericSuccessJSON {
    return GenericSuccess.toJSON(this);
  }
  
  static toJSON = (value: GenericSuccess): GenericSuccessJSON => {
    return {
      message: typeof value.message !== 'undefined' && value.message != null ? value.message : undefined
    };
  }
  
  static fromJSON = (value: GenericSuccessJSON): GenericSuccess => {
    return new GenericSuccess({
      message: typeof value.message !== 'undefined' && value.message != null ? value.message : undefined
    });
  }
  
}