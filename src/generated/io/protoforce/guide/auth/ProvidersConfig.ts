// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  FacebookConfig
} from './FacebookConfig';
import {
  GithubConfig
} from './GithubConfig';
import {
  GoogleConfig
} from './GoogleConfig';
import {
  ProvidersConfigJSON
} from './codecs/ProvidersConfigJSON';
import {
  TwitterConfig
} from './TwitterConfig';
import {
  WithRTTI
} from '../../../../irt';

export interface ProvidersConfigDefn extends WithRTTI {
  facebook: FacebookConfig;
  google: GoogleConfig;
  twitter: TwitterConfig;
  github: GithubConfig;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): ProvidersConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:ProvidersConfig
  * 
  * Defined at config.pfm @ 37:1
  */
export class ProvidersConfig implements ProvidersConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  facebook: FacebookConfig;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  google: GoogleConfig;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  twitter: TwitterConfig;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  github: GithubConfig;
  static readonly RTTI_CLASS: string = 'ProvidersConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:ProvidersConfig';
  
  constructor(data?: {facebook: FacebookConfig, google: GoogleConfig, twitter: TwitterConfig, github: GithubConfig}, skipDefaults?: boolean | undefined) {
    if (!data) {
      return;
    }
    this.facebook = data.facebook;
    this.google = data.google;
    this.twitter = data.twitter;
    this.github = data.github;
  }
  
  get RTTI_CLASS(): string {
    return ProvidersConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return ProvidersConfig.RTTI_FQN;
  }
  
  toJSON(): ProvidersConfigJSON {
    return ProvidersConfig.toJSON(this);
  }
  
  static toJSON = (value: ProvidersConfig): ProvidersConfigJSON => {
    return {
      facebook: value.facebook.toJSON(),
      google: value.google.toJSON(),
      twitter: value.twitter.toJSON(),
      github: value.github.toJSON()
    };
  }
  
  static fromJSON = (value: ProvidersConfigJSON): ProvidersConfig => {
    return new ProvidersConfig({
      facebook: FacebookConfig.fromJSON(value.facebook),
      google: GoogleConfig.fromJSON(value.google),
      twitter: TwitterConfig.fromJSON(value.twitter),
      github: GithubConfig.fromJSON(value.github)
    });
  }
  
}