// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  TwitterConfigJSON
} from './codecs/TwitterConfigJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface TwitterConfigDefn extends WithRTTI {
  customerId: string;
  customerSecret: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): TwitterConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:TwitterConfig
  * 
  * Defined at config.pfm @ 17:1
  */
export class TwitterConfig implements TwitterConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  customerId: string;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  customerSecret: string;
  static readonly RTTI_CLASS: string = 'TwitterConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:TwitterConfig';
  
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
    return TwitterConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return TwitterConfig.RTTI_FQN;
  }
  
  toJSON(): TwitterConfigJSON {
    return TwitterConfig.toJSON(this);
  }
  
  static toJSON = (value: TwitterConfig): TwitterConfigJSON => {
    return {
      customerId: value.customerId,
      customerSecret: value.customerSecret
    };
  }
  
  static fromJSON = (value: TwitterConfigJSON): TwitterConfig => {
    return new TwitterConfig({
      customerId: value.customerId,
      customerSecret: value.customerSecret
    });
  }
  
}