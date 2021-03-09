// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  GoogleConfigJSON
} from './codecs/GoogleConfigJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface GoogleConfigDefn extends WithRTTI {
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): GoogleConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:GoogleConfig
  * 
  * Defined at config.pfm @ 11:1
  */
export class GoogleConfig implements GoogleConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  clientId: string;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  clientSecret: string;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  redirectUrl: string;
  static readonly RTTI_CLASS: string = 'GoogleConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:GoogleConfig';
  
  constructor(data?: {clientId: string, clientSecret: string, redirectUrl: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.clientId = '';
        this.clientSecret = '';
        this.redirectUrl = '';
      }
      return;
    }
    this.clientId = data.clientId;
    this.clientSecret = data.clientSecret;
    this.redirectUrl = data.redirectUrl;
  }
  
  get RTTI_CLASS(): string {
    return GoogleConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return GoogleConfig.RTTI_FQN;
  }
  
  toJSON(): GoogleConfigJSON {
    return GoogleConfig.toJSON(this);
  }
  
  static toJSON = (value: GoogleConfig): GoogleConfigJSON => {
    return {
      clientId: value.clientId,
      clientSecret: value.clientSecret,
      redirectUrl: value.redirectUrl
    };
  }
  
  static fromJSON = (value: GoogleConfigJSON): GoogleConfig => {
    return new GoogleConfig({
      clientId: value.clientId,
      clientSecret: value.clientSecret,
      redirectUrl: value.redirectUrl
    });
  }
  
}