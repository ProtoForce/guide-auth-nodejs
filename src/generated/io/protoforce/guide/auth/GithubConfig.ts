// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  GithubConfigJSON
} from './codecs/GithubConfigJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface GithubConfigDefn extends WithRTTI {
  clientId: string;
  clientSecret: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): GithubConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:GithubConfig
  * 
  * Defined at config.pfm @ 22:1
  */
export class GithubConfig implements GithubConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  clientId: string;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  clientSecret: string;
  static readonly RTTI_CLASS: string = 'GithubConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:GithubConfig';
  
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
    return GithubConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return GithubConfig.RTTI_FQN;
  }
  
  toJSON(): GithubConfigJSON {
    return GithubConfig.toJSON(this);
  }
  
  static toJSON = (value: GithubConfig): GithubConfigJSON => {
    return {
      clientId: value.clientId,
      clientSecret: value.clientSecret
    };
  }
  
  static fromJSON = (value: GithubConfigJSON): GithubConfig => {
    return new GithubConfig({
      clientId: value.clientId,
      clientSecret: value.clientSecret
    });
  }
  
}