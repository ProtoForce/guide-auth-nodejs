// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceDisable2FAInputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceDisable2FAInputJSON';
import {
  WithRTTI,
  RestSpec,
  HTTPMethod
} from '../../../../../../irt';

export interface AuthProtectedServiceDisable2FAInputDefn extends WithRTTI {
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): AuthProtectedServiceDisable2FAInputJSON;
}

/**
  * 
  *  Disable two factor authentication
  * 
  * Class io.protoforce.guide.auth.authprotectedservice.models:Disable2FAInput
  * 
  * Defined at auth.service.pfm @ 120:3
  */
export class AuthProtectedServiceDisable2FAInput implements AuthProtectedServiceDisable2FAInputDefn {
  static readonly RTTI_CLASS: string = 'Disable2FAInput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authprotectedservice.models:Disable2FAInput';
  
  get RTTI_CLASS(): string {
    return AuthProtectedServiceDisable2FAInput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthProtectedServiceDisable2FAInput.RTTI_FQN;
  }
  
  static get restSpec(): RestSpec {
    return {
      method: HTTPMethod.DELETE,
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
                 
    ]
    }
         ,
      body: {
      fields: []
    }
    };
  }
  
  toJSON(): AuthProtectedServiceDisable2FAInputJSON {
    return AuthProtectedServiceDisable2FAInput.toJSON(this);
  }
  
  static toJSON = (value: AuthProtectedServiceDisable2FAInput): AuthProtectedServiceDisable2FAInputJSON => {
    return {};
  }
  
  static fromJSON = (value: AuthProtectedServiceDisable2FAInputJSON): AuthProtectedServiceDisable2FAInput => {
    return new AuthProtectedServiceDisable2FAInput();
  }
  
}