// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  TokensServerConfigJSON
} from './codecs/TokensServerConfigJSON';
import {
  WithRTTI,
  Validator
} from '../../../../irt';

export interface TokensServerConfigDefn extends WithRTTI {
  jwtKey: string;
  expiration: number;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): TokensServerConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:TokensServerConfig
  * 
  * Defined at config.pfm @ 36:1
  */
export class TokensServerConfig implements TokensServerConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  jwtKey: string;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  private _expiration: number;
  static readonly RTTI_CLASS: string = 'TokensServerConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:TokensServerConfig';
  
  constructor(data?: {jwtKey: string, expiration: number}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.jwtKey = '';
        this.expiration = 0;
      }
      return;
    }
    this.jwtKey = data.jwtKey;
    this.expiration = data.expiration;
  }
  
  get expiration(): number {
    return this._expiration;
  }
  
  set expiration(value: number) {
    Validator.min(value, 0.0, 'expiration');
    Validator.max(value, 4.294967295E9, 'expiration');
    Validator.integer(value, 'expiration');
    this._expiration = value;
  }
  
  get RTTI_CLASS(): string {
    return TokensServerConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return TokensServerConfig.RTTI_FQN;
  }
  
  toJSON(): TokensServerConfigJSON {
    return TokensServerConfig.toJSON(this);
  }
  
  static toJSON = (value: TokensServerConfig): TokensServerConfigJSON => {
    return {
      jwtKey: value.jwtKey,
      expiration: value.expiration
    };
  }
  
  static fromJSON = (value: TokensServerConfigJSON): TokensServerConfig => {
    return new TokensServerConfig({
      jwtKey: value.jwtKey,
      expiration: value.expiration
    });
  }
  
}