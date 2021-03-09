// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceRequest2FAInputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceRequest2FAInputJSON';
import {
  MFAMethodRequest
} from '../../MFAMethodRequest';
import {
  WithRTTI,
  RestSpec,
  HTTPMethod
} from '../../../../../../irt';

export interface AuthProtectedServiceRequest2FAInputDefn extends WithRTTI {
  method: MFAMethodRequest;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): AuthProtectedServiceRequest2FAInputJSON;
}

/**
  * 
  *  Request two factor authentication
  * 
  * Class io.protoforce.guide.auth.authprotectedservice.models:Request2FAInput
  * 
  * Defined at auth.service.pfm @ 109:3
  */
export class AuthProtectedServiceRequest2FAInput implements AuthProtectedServiceRequest2FAInputDefn {
  method: MFAMethodRequest;
  static readonly RTTI_CLASS: string = 'Request2FAInput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authprotectedservice.models:Request2FAInput';
  
  constructor(data: {method: MFAMethodRequest}) {
    
    this.method = data.method;
  }
  
  get RTTI_CLASS(): string {
    return AuthProtectedServiceRequest2FAInput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthProtectedServiceRequest2FAInput.RTTI_FQN;
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
        value: 'request'
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
        id: 'MFAMethodRequest',
        args: []
      }
      },
        path: []
      }
    ]
    }
    };
  }
  
  toJSON(): AuthProtectedServiceRequest2FAInputJSON {
    return AuthProtectedServiceRequest2FAInput.toJSON(this);
  }
  
  static toJSON = (value: AuthProtectedServiceRequest2FAInput): AuthProtectedServiceRequest2FAInputJSON => {
    return {
      method: value.method.toJSON()
    };
  }
  
  static fromJSON = (value: AuthProtectedServiceRequest2FAInputJSON): AuthProtectedServiceRequest2FAInput => {
    return new AuthProtectedServiceRequest2FAInput({
      method: MFAMethodRequest.fromJSON(value.method)
    });
  }
  
}