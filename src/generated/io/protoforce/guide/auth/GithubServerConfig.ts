// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  GithubClientConfig
} from './GithubClientConfig';
import {
  GithubServerConfigJSON
} from './codecs/GithubServerConfigJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface GithubServerConfigDefn extends WithRTTI {
  clientId: string;
  clientSecret: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): GithubServerConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:GithubServerConfig
  * 
  * Defined at config.pfm @ 31:1
  */
export class GithubServerConfig implements GithubServerConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  clientId: string;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  clientSecret: string;
  static readonly RTTI_CLASS: string = 'GithubServerConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:GithubServerConfig';
  
  constructor(data?: {clientId: string, clientSecret: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.clientId = '';
        this.clientSecret = '';
      }
      return;
    }
    this.clientId = data.clientId;
    this.clientSecret = data.clientSecret;
  }
  
  get RTTI_CLASS(): string {
    return GithubServerConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return GithubServerConfig.RTTI_FQN;
  }
  
  static fromGithubClientConfig(from: GithubClientConfig, clientSecret: string): GithubServerConfig {
    return new GithubServerConfig({
      clientSecret: clientSecret,
      clientId: from.clientId
    });
  }
  
  loadGithubClientConfig(from: GithubClientConfig): void {
    this.clientId = from.clientId;
  }
  
  toGithubClientConfig(): GithubClientConfig {
    return new GithubClientConfig({
      clientId: this.clientId
    });
  }
  
  toJSON(): GithubServerConfigJSON {
    return GithubServerConfig.toJSON(this);
  }
  
  static toJSON = (value: GithubServerConfig): GithubServerConfigJSON => {
    return {
      clientId: value.clientId,
      clientSecret: value.clientSecret
    };
  }
  
  static fromJSON = (value: GithubServerConfigJSON): GithubServerConfig => {
    return new GithubServerConfig({
      clientId: value.clientId,
      clientSecret: value.clientSecret
    });
  }
  
}