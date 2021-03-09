// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  GoogleClientConfigJSON
} from './codecs/GoogleClientConfigJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface GoogleClientConfigDefn extends WithRTTI {
  clientId: string;
  redirectUrl: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): GoogleClientConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:GoogleClientConfig
  * 
  * Defined at config.pfm @ 6:1
  */
export class GoogleClientConfig implements GoogleClientConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  clientId: string;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  redirectUrl: string;
  static readonly RTTI_CLASS: string = 'GoogleClientConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:GoogleClientConfig';
  
  constructor(data?: {clientId: string, redirectUrl: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.clientId = '';
        this.redirectUrl = '';
      }
      return;
    }
    this.clientId = data.clientId;
    this.redirectUrl = data.redirectUrl;
  }
  
  get RTTI_CLASS(): string {
    return GoogleClientConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return GoogleClientConfig.RTTI_FQN;
  }
  
  toJSON(): GoogleClientConfigJSON {
    return GoogleClientConfig.toJSON(this);
  }
  
  static toJSON = (value: GoogleClientConfig): GoogleClientConfigJSON => {
    return {
      clientId: value.clientId,
      redirectUrl: value.redirectUrl
    };
  }
  
  static fromJSON = (value: GoogleClientConfigJSON): GoogleClientConfig => {
    return new GoogleClientConfig({
      clientId: value.clientId,
      redirectUrl: value.redirectUrl
    });
  }
  
}