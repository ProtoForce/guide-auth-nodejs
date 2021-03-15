// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  TwitterClientConfig
} from './TwitterClientConfig';
import {
  TwitterServerConfigJSON
} from './codecs/TwitterServerConfigJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface TwitterServerConfigDefn extends WithRTTI {
  customerId: string;
  customerSecret: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): TwitterServerConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:TwitterServerConfig
  * 
  * Defined at config.pfm @ 22:1
  */
export class TwitterServerConfig implements TwitterServerConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  customerId: string;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  customerSecret: string;
  static readonly RTTI_CLASS: string = 'TwitterServerConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:TwitterServerConfig';
  
  constructor(data?: {customerId: string, customerSecret: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.customerId = '';
        this.customerSecret = '';
      }
      return;
    }
    this.customerId = data.customerId;
    this.customerSecret = data.customerSecret;
  }
  
  get RTTI_CLASS(): string {
    return TwitterServerConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return TwitterServerConfig.RTTI_FQN;
  }
  
  static fromTwitterClientConfig(from: TwitterClientConfig, customerSecret: string): TwitterServerConfig {
    return new TwitterServerConfig({
      customerSecret: customerSecret,
      customerId: from.customerId
    });
  }
  
  loadTwitterClientConfig(from: TwitterClientConfig): void {
    this.customerId = from.customerId;
  }
  
  toTwitterClientConfig(): TwitterClientConfig {
    return new TwitterClientConfig({
      customerId: this.customerId
    });
  }
  
  toJSON(): TwitterServerConfigJSON {
    return TwitterServerConfig.toJSON(this);
  }
  
  static toJSON = (value: TwitterServerConfig): TwitterServerConfigJSON => {
    return {
      customerId: value.customerId,
      customerSecret: value.customerSecret
    };
  }
  
  static fromJSON = (value: TwitterServerConfigJSON): TwitterServerConfig => {
    return new TwitterServerConfig({
      customerId: value.customerId,
      customerSecret: value.customerSecret
    });
  }
  
}