// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  TokensConfigJSON
} from './codecs/TokensConfigJSON';
import {
  WithRTTI,
  Validator
} from '../../../../irt';

export interface TokensConfigDefn extends WithRTTI {
  jwtKey: string;
  expiration: number;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): TokensConfigJSON;
}

/**
  * Class io.protoforce.guide.auth:TokensConfig
  * 
  * Defined at config.pfm @ 2:1
  */
export class TokensConfig implements TokensConfigDefn {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  jwtKey: string;
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  private _expiration: number;
  static readonly RTTI_CLASS: string = 'TokensConfig';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:TokensConfig';
  
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
    return TokensConfig.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return TokensConfig.RTTI_FQN;
  }
  
  toJSON(): TokensConfigJSON {
    return TokensConfig.toJSON(this);
  }
  
  static toJSON = (value: TokensConfig): TokensConfigJSON => {
    return {
      jwtKey: value.jwtKey,
      expiration: value.expiration
    };
  }
  
  static fromJSON = (value: TokensConfigJSON): TokensConfig => {
    return new TokensConfig({
      jwtKey: value.jwtKey,
      expiration: value.expiration
    });
  }
  
}