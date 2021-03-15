// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  SMSServerConfigJSON
} from './codecs/SMSServerConfigJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface SMSServerConfigDefn extends WithRTTI {
  apiKey: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): SMSServerConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:SMSServerConfig
  * 
  * Defined at config.pfm @ 47:1
  */
export class SMSServerConfig implements SMSServerConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  apiKey: string;
  static readonly RTTI_CLASS: string = 'SMSServerConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:SMSServerConfig';
  
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
    return SMSServerConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SMSServerConfig.RTTI_FQN;
  }
  
  toJSON(): SMSServerConfigJSON {
    return SMSServerConfig.toJSON(this);
  }
  
  static toJSON = (value: SMSServerConfig): SMSServerConfigJSON => {
    return {
      apiKey: value.apiKey
    };
  }
  
  static fromJSON = (value: SMSServerConfigJSON): SMSServerConfig => {
    return new SMSServerConfig({
      apiKey: value.apiKey
    });
  }
  
}