// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  MFAMethodRequestAppJSON
} from './codecs/MFAMethodRequestAppJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface MFAMethodRequestAppDefn extends WithRTTI {
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): MFAMethodRequestAppJSON;
}

/**
  * 
  *  Request an app based MFA
  * 
  * Class io.protoforce.guide.auth/MFAMethodRequest:App (member of ADT io.protoforce.guide.auth:MFAMethodRequest)
  * 
  * Defined at auth.mfa.pfm @ 9:3
  */
export class MFAMethodRequestApp implements MFAMethodRequestAppDefn {
  static readonly RTTI_CLASS: string = 'App';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth/MFAMethodRequest:App';
  
  get RTTI_CLASS(): string {
    return MFAMethodRequestApp.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return MFAMethodRequestApp.RTTI_FQN;
  }
  
  toJSON(): MFAMethodRequestAppJSON {
    return MFAMethodRequestApp.toJSON(this);
  }
  
  static toJSON = (value: MFAMethodRequestApp): MFAMethodRequestAppJSON => {
    return {};
  }
  
  static fromJSON = (value: MFAMethodRequestAppJSON): MFAMethodRequestApp => {
    return new MFAMethodRequestApp();
  }
  
}