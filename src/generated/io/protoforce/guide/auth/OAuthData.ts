// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  OAuthDataImplJSON
} from './codecs/OAuthDataImplJSON';
import {
  WithRTTI
} from '../../../../irt';

/**
  * 
  *  OAuth Data holds information obtained during OAuth flow
  * 
  * Interface io.protoforce.guide.auth:OAuthData
  * 
  * Defined at /providers/oauth.pfm @ 4:1
  */
export interface OAuthData extends WithRTTI {
  /**
    * OAuth token
    */
  accessToken: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): OAuthDataImplJSON;
}