// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  EmailConfigJSON
} from './codecs/EmailConfigJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface EmailConfigDefn extends WithRTTI {
  apiKey: string;
  confirmEndpoint: string;
  resetPassEndpoint: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): EmailConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:EmailConfig
  * 
  * Defined at config.pfm @ 27:1
  */
export class EmailConfig implements EmailConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  apiKey: string;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  confirmEndpoint: string;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  resetPassEndpoint: string;
  static readonly RTTI_CLASS: string = 'EmailConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:EmailConfig';
  
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
    return EmailConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return EmailConfig.RTTI_FQN;
  }
  
  toJSON(): EmailConfigJSON {
    return EmailConfig.toJSON(this);
  }
  
  static toJSON = (value: EmailConfig): EmailConfigJSON => {
    return {
      apiKey: value.apiKey,
      confirmEndpoint: value.confirmEndpoint,
      resetPassEndpoint: value.resetPassEndpoint
    };
  }
  
  static fromJSON = (value: EmailConfigJSON): EmailConfig => {
    return new EmailConfig({
      apiKey: value.apiKey,
      confirmEndpoint: value.confirmEndpoint,
      resetPassEndpoint: value.resetPassEndpoint
    });
  }
  
}