// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  TwitterClientConfigJSON
} from './codecs/TwitterClientConfigJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface TwitterClientConfigDefn extends WithRTTI {
  customerId: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): TwitterClientConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:TwitterClientConfig
  * 
  * Defined at config.pfm @ 18:1
  */
export class TwitterClientConfig implements TwitterClientConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  customerId: string;
  static readonly RTTI_CLASS: string = 'TwitterClientConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:TwitterClientConfig';
  
  constructor(data?: {customerId: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.customerId = '';
      }
      return;
    }
    this.customerId = data.customerId;
  }
  
  get RTTI_CLASS(): string {
    return TwitterClientConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return TwitterClientConfig.RTTI_FQN;
  }
  
  toJSON(): TwitterClientConfigJSON {
    return TwitterClientConfig.toJSON(this);
  }
  
  static toJSON = (value: TwitterClientConfig): TwitterClientConfigJSON => {
    return {
      customerId: value.customerId
    };
  }
  
  static fromJSON = (value: TwitterClientConfigJSON): TwitterClientConfig => {
    return new TwitterClientConfig({
      customerId: value.customerId
    });
  }
  
}