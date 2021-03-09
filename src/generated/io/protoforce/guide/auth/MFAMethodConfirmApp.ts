// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  MFAMethodConfirmAppJSON
} from './codecs/MFAMethodConfirmAppJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface MFAMethodConfirmAppDefn extends WithRTTI {
  /**
    * One code sample generated using the previously provided secret
    */
  code: string;
  /**
    * Token previously provided in the MFAMethodPending structure
    */
  token: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): MFAMethodConfirmAppJSON;
}

/**
  * 
  *  App based authentication confirmation
  * 
  * Class io.protoforce.guide.auth/MFAMethodConfirm:App (member of ADT io.protoforce.guide.auth:MFAMethodConfirm)
  * 
  * Defined at auth.mfa.pfm @ 42:3
  */
export class MFAMethodConfirmApp implements MFAMethodConfirmAppDefn {
  /**
    * One code sample generated using the previously provided secret
    */
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  code: string;
  /**
    * Token previously provided in the MFAMethodPending structure
    */
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  token: string;
  static readonly RTTI_CLASS: string = 'App';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth/MFAMethodConfirm:App';
  
  constructor(data?: {/**
    * One code sample generated using the previously provided secret
    */
  code: string, /**
    * Token previously provided in the MFAMethodPending structure
    */
  token: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.code = '';
        this.token = '';
      }
      return;
    }
    this.code = data.code;
    this.token = data.token;
  }
  
  get RTTI_CLASS(): string {
    return MFAMethodConfirmApp.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return MFAMethodConfirmApp.RTTI_FQN;
  }
  
  toJSON(): MFAMethodConfirmAppJSON {
    return MFAMethodConfirmApp.toJSON(this);
  }
  
  static toJSON = (value: MFAMethodConfirmApp): MFAMethodConfirmAppJSON => {
    return {
      code: value.code,
      token: value.token
    };
  }
  
  static fromJSON = (value: MFAMethodConfirmAppJSON): MFAMethodConfirmApp => {
    return new MFAMethodConfirmApp({
      code: value.code,
      token: value.token
    });
  }
  
}