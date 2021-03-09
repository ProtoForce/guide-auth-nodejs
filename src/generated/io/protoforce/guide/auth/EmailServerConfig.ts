// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  EmailServerConfigJSON
} from './codecs/EmailServerConfigJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface EmailServerConfigDefn extends WithRTTI {
  apiKey: string;
  confirmEndpoint: string;
  resetPassEndpoint: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): EmailServerConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:EmailServerConfig
  * 
  * Defined at config.pfm @ 39:1
  */
export class EmailServerConfig implements EmailServerConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  apiKey: string;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  confirmEndpoint: string;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  resetPassEndpoint: string;
  static readonly RTTI_CLASS: string = 'EmailServerConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:EmailServerConfig';
  
  constructor(data?: {apiKey: string, confirmEndpoint: string, resetPassEndpoint: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.apiKey = '';
        this.confirmEndpoint = '';
        this.resetPassEndpoint = '';
      }
      return;
    }
    this.apiKey = data.apiKey;
    this.confirmEndpoint = data.confirmEndpoint;
    this.resetPassEndpoint = data.resetPassEndpoint;
  }
  
  get RTTI_CLASS(): string {
    return EmailServerConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return EmailServerConfig.RTTI_FQN;
  }
  
  toJSON(): EmailServerConfigJSON {
    return EmailServerConfig.toJSON(this);
  }
  
  static toJSON = (value: EmailServerConfig): EmailServerConfigJSON => {
    return {
      apiKey: value.apiKey,
      confirmEndpoint: value.confirmEndpoint,
      resetPassEndpoint: value.resetPassEndpoint
    };
  }
  
  static fromJSON = (value: EmailServerConfigJSON): EmailServerConfig => {
    return new EmailServerConfig({
      apiKey: value.apiKey,
      confirmEndpoint: value.confirmEndpoint,
      resetPassEndpoint: value.resetPassEndpoint
    });
  }
  
}