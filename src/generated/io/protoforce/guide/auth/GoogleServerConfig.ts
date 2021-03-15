// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  GoogleClientConfig
} from './GoogleClientConfig';
import {
  GoogleServerConfigJSON
} from './codecs/GoogleServerConfigJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface GoogleServerConfigDefn extends WithRTTI {
  clientId: string;
  redirectUrl: string;
  clientSecret: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): GoogleServerConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:GoogleServerConfig
  * 
  * Defined at config.pfm @ 13:1
  */
export class GoogleServerConfig implements GoogleServerConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  clientId: string;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  redirectUrl: string;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  clientSecret: string;
  static readonly RTTI_CLASS: string = 'GoogleServerConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:GoogleServerConfig';
  
  constructor(data?: {clientId: string, redirectUrl: string, clientSecret: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.clientId = '';
        this.redirectUrl = '';
        this.clientSecret = '';
      }
      return;
    }
    this.clientId = data.clientId;
    this.redirectUrl = data.redirectUrl;
    this.clientSecret = data.clientSecret;
  }
  
  get RTTI_CLASS(): string {
    return GoogleServerConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return GoogleServerConfig.RTTI_FQN;
  }
  
  static fromGoogleClientConfig(from: GoogleClientConfig, clientSecret: string): GoogleServerConfig {
    return new GoogleServerConfig({
      clientSecret: clientSecret,
      clientId: from.clientId,
      redirectUrl: from.redirectUrl
    });
  }
  
  loadGoogleClientConfig(from: GoogleClientConfig): void {
    this.clientId = from.clientId;
    this.redirectUrl = from.redirectUrl;
  }
  
  toGoogleClientConfig(): GoogleClientConfig {
    return new GoogleClientConfig({
      clientId: this.clientId,
      redirectUrl: this.redirectUrl
    });
  }
  
  toJSON(): GoogleServerConfigJSON {
    return GoogleServerConfig.toJSON(this);
  }
  
  static toJSON = (value: GoogleServerConfig): GoogleServerConfigJSON => {
    return {
      clientId: value.clientId,
      redirectUrl: value.redirectUrl,
      clientSecret: value.clientSecret
    };
  }
  
  static fromJSON = (value: GoogleServerConfigJSON): GoogleServerConfig => {
    return new GoogleServerConfig({
      clientId: value.clientId,
      redirectUrl: value.redirectUrl,
      clientSecret: value.clientSecret
    });
  }
  
}