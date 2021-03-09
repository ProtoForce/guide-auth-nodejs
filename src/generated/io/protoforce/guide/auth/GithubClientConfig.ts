// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  GithubClientConfigJSON
} from './codecs/GithubClientConfigJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface GithubClientConfigDefn extends WithRTTI {
  clientId: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): GithubClientConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:GithubClientConfig
  * 
  * Defined at config.pfm @ 25:1
  */
export class GithubClientConfig implements GithubClientConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  clientId: string;
  static readonly RTTI_CLASS: string = 'GithubClientConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:GithubClientConfig';
  
  constructor(data?: {clientId: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.clientId = '';
      }
      return;
    }
    this.clientId = data.clientId;
  }
  
  get RTTI_CLASS(): string {
    return GithubClientConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return GithubClientConfig.RTTI_FQN;
  }
  
  toJSON(): GithubClientConfigJSON {
    return GithubClientConfig.toJSON(this);
  }
  
  static toJSON = (value: GithubClientConfig): GithubClientConfigJSON => {
    return {
      clientId: value.clientId
    };
  }
  
  static fromJSON = (value: GithubClientConfigJSON): GithubClientConfig => {
    return new GithubClientConfig({
      clientId: value.clientId
    });
  }
  
}