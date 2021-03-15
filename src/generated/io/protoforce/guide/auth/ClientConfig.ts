// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  ClientConfigJSON
} from './codecs/ClientConfigJSON';
import {
  FacebookConfig
} from './FacebookConfig';
import {
  GithubClientConfig
} from './GithubClientConfig';
import {
  GoogleClientConfig
} from './GoogleClientConfig';
import {
  TwitterClientConfig
} from './TwitterClientConfig';
import {
  WithRTTI
} from '../../../../irt';

export interface ClientConfigDefn extends WithRTTI {
  /**
    * Services endpoint
    */
  endpoint: string;
  facebook: FacebookConfig;
  google: GoogleClientConfig;
  twitter: TwitterClientConfig;
  github: GithubClientConfig;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): ClientConfigJSON;
}

/**
  * 
  *  Client side configuration. Should be used by clients to connect to a service
  *  and other providers using the defined IDs and endpoints
  * 
  * Class io.protoforce.guide.auth:ClientConfig
  * 
  * Defined at config.pfm @ 55:1
  */
export class ClientConfig implements ClientConfigDefn {
  /**
    * Services endpoint
    */
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  endpoint: string;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  facebook: FacebookConfig;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  google: GoogleClientConfig;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  twitter: TwitterClientConfig;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  github: GithubClientConfig;
  static readonly RTTI_CLASS: string = 'ClientConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:ClientConfig';
  
  constructor(data?: {/**
    * Services endpoint
    */
  endpoint: string, facebook: FacebookConfig, google: GoogleClientConfig, twitter: TwitterClientConfig, github: GithubClientConfig}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.endpoint = '';
      }
      return;
    }
    this.endpoint = data.endpoint;
    this.facebook = data.facebook;
    this.google = data.google;
    this.twitter = data.twitter;
    this.github = data.github;
  }
  
  get RTTI_CLASS(): string {
    return ClientConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return ClientConfig.RTTI_FQN;
  }
  
  toJSON(): ClientConfigJSON {
    return ClientConfig.toJSON(this);
  }
  
  static toJSON = (value: ClientConfig): ClientConfigJSON => {
    return {
      endpoint: value.endpoint,
      facebook: value.facebook.toJSON(),
      google: value.google.toJSON(),
      twitter: value.twitter.toJSON(),
      github: value.github.toJSON()
    };
  }
  
  static fromJSON = (value: ClientConfigJSON): ClientConfig => {
    return new ClientConfig({
      endpoint: value.endpoint,
      facebook: FacebookConfig.fromJSON(value.facebook),
      google: GoogleClientConfig.fromJSON(value.google),
      twitter: TwitterClientConfig.fromJSON(value.twitter),
      github: GithubClientConfig.fromJSON(value.github)
    });
  }
  
}