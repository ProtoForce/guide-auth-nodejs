// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  EmailConfig
} from './EmailConfig';
import {
  ProvidersConfig
} from './ProvidersConfig';
import {
  SMSConfig
} from './SMSConfig';
import {
  ServerEnvConfigJSON
} from './codecs/ServerEnvConfigJSON';
import {
  TokensConfig
} from './TokensConfig';
import {
  WithRTTI
} from '../../../../irt';

export interface ServerEnvConfigDefn extends WithRTTI {
  tokens: TokensConfig;
  providers: ProvidersConfig;
  email: EmailConfig;
  sms: SMSConfig;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): ServerEnvConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:ServerEnvConfig
  * 
  * Defined at config.pfm @ 44:1
  */
export class ServerEnvConfig implements ServerEnvConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  tokens: TokensConfig;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  providers: ProvidersConfig;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  email: EmailConfig;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  sms: SMSConfig;
  static readonly RTTI_CLASS: string = 'ServerEnvConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:ServerEnvConfig';
  
  constructor(data?: {tokens: TokensConfig, providers: ProvidersConfig, email: EmailConfig, sms: SMSConfig}, skipDefaults?: boolean | undefined) {
    if (!data) {
      return;
    }
    this.tokens = data.tokens;
    this.providers = data.providers;
    this.email = data.email;
    this.sms = data.sms;
  }
  
  get RTTI_CLASS(): string {
    return ServerEnvConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return ServerEnvConfig.RTTI_FQN;
  }
  
  toJSON(): ServerEnvConfigJSON {
    return ServerEnvConfig.toJSON(this);
  }
  
  static toJSON = (value: ServerEnvConfig): ServerEnvConfigJSON => {
    return {
      tokens: value.tokens.toJSON(),
      providers: value.providers.toJSON(),
      email: value.email.toJSON(),
      sms: value.sms.toJSON()
    };
  }
  
  static fromJSON = (value: ServerEnvConfigJSON): ServerEnvConfig => {
    return new ServerEnvConfig({
      tokens: TokensConfig.fromJSON(value.tokens),
      providers: ProvidersConfig.fromJSON(value.providers),
      email: EmailConfig.fromJSON(value.email),
      sms: SMSConfig.fromJSON(value.sms)
    });
  }
  
}