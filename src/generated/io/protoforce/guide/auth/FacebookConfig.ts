// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  FacebookConfigJSON
} from './codecs/FacebookConfigJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface FacebookConfigDefn extends WithRTTI {
  appId: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): FacebookConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:FacebookConfig
  * 
  * Defined at config.pfm @ 7:1
  */
export class FacebookConfig implements FacebookConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  appId: string;
  static readonly RTTI_CLASS: string = 'FacebookConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:FacebookConfig';
  
  constructor(data?: {appId: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.appId = '';
      }
      return;
    }
    this.appId = data.appId;
  }
  
  get RTTI_CLASS(): string {
    return FacebookConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return FacebookConfig.RTTI_FQN;
  }
  
  toJSON(): FacebookConfigJSON {
    return FacebookConfig.toJSON(this);
  }
  
  static toJSON = (value: FacebookConfig): FacebookConfigJSON => {
    return {
      appId: value.appId
    };
  }
  
  static fromJSON = (value: FacebookConfigJSON): FacebookConfig => {
    return new FacebookConfig({
      appId: value.appId
    });
  }
  
}