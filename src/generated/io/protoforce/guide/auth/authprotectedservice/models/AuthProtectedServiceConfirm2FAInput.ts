// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceConfirm2FAInputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceConfirm2FAInputJSON';
import {
  MFAMethodConfirm
} from '../../MFAMethodConfirm';
import {
  WithRTTI,
  RestSpec,
  HTTPMethod
} from '../../../../../../irt';

export interface AuthProtectedServiceConfirm2FAInputDefn extends WithRTTI {
  method: MFAMethodConfirm;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): AuthProtectedServiceConfirm2FAInputJSON;
}

/**
  * 
  *  Confirm two factor authentication
  * 
  * Class io.protoforce.guide.auth.authprotectedservice.models:Confirm2FAInput
  * 
  * Defined at auth.service.pfm @ 114:3
  */
export class AuthProtectedServiceConfirm2FAInput implements AuthProtectedServiceConfirm2FAInputDefn {
  method: MFAMethodConfirm;
  static readonly RTTI_CLASS: string = 'Confirm2FAInput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authprotectedservice.models:Confirm2FAInput';
  
  constructor(data: {method: MFAMethodConfirm}) {
    
    this.method = data.method;
  }
  
  get RTTI_CLASS(): string {
    return AuthProtectedServiceConfirm2FAInput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthProtectedServiceConfirm2FAInput.RTTI_FQN;
  }
  
  static get restSpec(): RestSpec {
    return {
      method: HTTPMethod.POST,
      extractor: {
      queryParameters: {
        
      },
      pathSpec: [
      {
        type: 'word',
        value: 'auth'
      }
                 ,
      {
        type: 'word',
        value: 'settings'
      }
                 ,
      {
        type: 'word',
        value: '2fa'
      }
                 ,
      {
        type: 'word',
        value: 'confirm'
      }
                 
    ]
    }
         ,
      body: {
      fields: [
      {
        field: {
        name: 'method',
        ref: {
        id: 'MFAMethodConfirm',
        args: []
      }
      },
        path: []
      }
    ]
    }
    };
  }
  
  toJSON(): AuthProtectedServiceConfirm2FAInputJSON {
    return AuthProtectedServiceConfirm2FAInput.toJSON(this);
  }
  
  static toJSON = (value: AuthProtectedServiceConfirm2FAInput): AuthProtectedServiceConfirm2FAInputJSON => {
    return {
      method: value.method.toJSON()
    };
  }
  
  static fromJSON = (value: AuthProtectedServiceConfirm2FAInputJSON): AuthProtectedServiceConfirm2FAInput => {
    return new AuthProtectedServiceConfirm2FAInput({
      method: MFAMethodConfirm.fromJSON(value.method)
    });
  }
  
}