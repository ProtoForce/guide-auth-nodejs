// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  MFAMethodPendingAppJSON
} from './codecs/MFAMethodPendingAppJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface MFAMethodPendingAppDefn extends WithRTTI {
  /**
    * Secret to be stored on the client only, this is the only
    *    time it will be avaialble.
    */
  secret: string;
  /**
    * Token to be preserved and passed into the confirmation of the
    *    MFA setup.
    */
  token: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): MFAMethodPendingAppJSON;
}

/**
  * 
  *  App based
  * 
  * Class io.protoforce.guide.auth/MFAMethodPending:App (member of ADT io.protoforce.guide.auth:MFAMethodPending)
  * 
  * Defined at auth.mfa.pfm @ 20:3
  */
export class MFAMethodPendingApp implements MFAMethodPendingAppDefn {
  /**
    * Secret to be stored on the client only, this is the only
    *    time it will be avaialble.
    */
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  secret: string;
  /**
    * Token to be preserved and passed into the confirmation of the
    *    MFA setup.
    */
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  token: string;
  static readonly RTTI_CLASS: string = 'App';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth/MFAMethodPending:App';
  
  constructor(data?: {/**
    * Secret to be stored on the client only, this is the only
    *    time it will be avaialble.
    */
  secret: string, /**
    * Token to be preserved and passed into the confirmation of the
    *    MFA setup.
    */
  token: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.secret = '';
        this.token = '';
      }
      return;
    }
    this.secret = data.secret;
    this.token = data.token;
  }
  
  get RTTI_CLASS(): string {
    return MFAMethodPendingApp.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return MFAMethodPendingApp.RTTI_FQN;
  }
  
  toJSON(): MFAMethodPendingAppJSON {
    return MFAMethodPendingApp.toJSON(this);
  }
  
  static toJSON = (value: MFAMethodPendingApp): MFAMethodPendingAppJSON => {
    return {
      secret: value.secret,
      token: value.token
    };
  }
  
  static fromJSON = (value: MFAMethodPendingAppJSON): MFAMethodPendingApp => {
    return new MFAMethodPendingApp({
      secret: value.secret,
      token: value.token
    });
  }
  
}