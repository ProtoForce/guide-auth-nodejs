// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  EmailServerConfig
} from './EmailServerConfig';
import {
  FacebookConfig
} from './FacebookConfig';
import {
  GithubServerConfig
} from './GithubServerConfig';
import {
  GoogleServerConfig
} from './GoogleServerConfig';
import {
  SMSServerConfig
} from './SMSServerConfig';
import {
  ServerConfigJSON
} from './codecs/ServerConfigJSON';
import {
  TokensServerConfig
} from './TokensServerConfig';
import {
  TwitterServerConfig
} from './TwitterServerConfig';
import {
  WithRTTI
} from '../../../../irt';

export interface ServerConfigDefn extends WithRTTI {
  tokens: TokensServerConfig;
  email: EmailServerConfig;
  sms: SMSServerConfig;
  facebook: FacebookConfig;
  google: GoogleServerConfig;
  twitter: TwitterServerConfig;
  github: GithubServerConfig;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): ServerConfigJSON;
}

/**
  * 
  *  Server side configuration
  * 
  * Class io.protoforce.guide.auth:ServerConfig
  * 
  * Defined at config.pfm @ 87:1
  */
export class ServerConfig implements ServerConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  tokens: TokensServerConfig;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  email: EmailServerConfig;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  sms: SMSServerConfig;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  facebook: FacebookConfig;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  google: GoogleServerConfig;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  twitter: TwitterServerConfig;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  github: GithubServerConfig;
  static readonly RTTI_CLASS: string = 'ServerConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:ServerConfig';
  
  constructor(data?: {tokens: TokensServerConfig, email: EmailServerConfig, sms: SMSServerConfig, facebook: FacebookConfig, google: GoogleServerConfig, twitter: TwitterServerConfig, github: GithubServerConfig}, skipDefaults?: boolean | undefined) {
    if (!data) {
      return;
    }
    this.tokens = data.tokens;
    this.email = data.email;
    this.sms = data.sms;
    this.facebook = data.facebook;
    this.google = data.google;
    this.twitter = data.twitter;
    this.github = data.github;
  }
  
  get RTTI_CLASS(): string {
    return ServerConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return ServerConfig.RTTI_FQN;
  }
  
  toJSON(): ServerConfigJSON {
    return ServerConfig.toJSON(this);
  }
  
  static toJSON = (value: ServerConfig): ServerConfigJSON => {
    return {
      tokens: value.tokens.toJSON(),
      email: value.email.toJSON(),
      sms: value.sms.toJSON(),
      facebook: value.facebook.toJSON(),
      google: value.google.toJSON(),
      twitter: value.twitter.toJSON(),
      github: value.github.toJSON()
    };
  }
  
  static fromJSON = (value: ServerConfigJSON): ServerConfig => {
    return new ServerConfig({
      tokens: TokensServerConfig.fromJSON(value.tokens),
      email: EmailServerConfig.fromJSON(value.email),
      sms: SMSServerConfig.fromJSON(value.sms),
      facebook: FacebookConfig.fromJSON(value.facebook),
      google: GoogleServerConfig.fromJSON(value.google),
      twitter: TwitterServerConfig.fromJSON(value.twitter),
      github: GithubServerConfig.fromJSON(value.github)
    });
  }
  
}