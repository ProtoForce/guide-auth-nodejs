// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  SMSConfigJSON
} from './codecs/SMSConfigJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface SMSConfigDefn extends WithRTTI {
  apiKey: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): SMSConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:SMSConfig
  * 
  * Defined at config.pfm @ 33:1
  */
export class SMSConfig implements SMSConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  apiKey: string;
  static readonly RTTI_CLASS: string = 'SMSConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:SMSConfig';
  
  constructor(data?: {apiKey: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.apiKey = '';
      }
      return;
    }
    this.apiKey = data.apiKey;
  }
  
  get RTTI_CLASS(): string {
    return SMSConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SMSConfig.RTTI_FQN;
  }
  
  toJSON(): SMSConfigJSON {
    return SMSConfig.toJSON(this);
  }
  
  static toJSON = (value: SMSConfig): SMSConfigJSON => {
    return {
      apiKey: value.apiKey
    };
  }
  
  static fromJSON = (value: SMSConfigJSON): SMSConfig => {
    return new SMSConfig({
      apiKey: value.apiKey
    });
  }
  
}