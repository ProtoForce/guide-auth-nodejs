// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceAddIdentityInputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceAddIdentityInputJSON';
import {
  SecondaryIdentity
} from '../../SecondaryIdentity';
import {
  WithRTTI,
  RestSpec,
  HTTPMethod
} from '../../../../../../irt';

export interface AuthProtectedServiceAddIdentityInputDefn extends WithRTTI {
  identity: SecondaryIdentity;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): AuthProtectedServiceAddIdentityInputJSON;
}

/**
  * 
  *  Add secondary identity
  * 
  * Class io.protoforce.guide.auth.authprotectedservice.models:AddIdentityInput
  * 
  * Defined at auth.service.pfm @ 125:3
  */
export class AuthProtectedServiceAddIdentityInput implements AuthProtectedServiceAddIdentityInputDefn {
  identity: SecondaryIdentity;
  static readonly RTTI_CLASS: string = 'AddIdentityInput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authprotectedservice.models:AddIdentityInput';
  
  constructor(data?: {identity: SecondaryIdentity}, skipDefaults?: boolean | undefined) {
    if (!data) {
      return;
    }
    this.identity = data.identity;
  }
  
  get RTTI_CLASS(): string {
    return AuthProtectedServiceAddIdentityInput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthProtectedServiceAddIdentityInput.RTTI_FQN;
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
        value: 'identity'
      }
                 
    ]
    }
         ,
      body: {
      fields: [
      {
        field: {
        name: 'identity',
        ref: {
        id: 'SecondaryIdentity',
        args: []
      }
      },
        path: []
      }
    ]
    }
    };
  }
  
  toJSON(): AuthProtectedServiceAddIdentityInputJSON {
    return AuthProtectedServiceAddIdentityInput.toJSON(this);
  }
  
  static toJSON = (value: AuthProtectedServiceAddIdentityInput): AuthProtectedServiceAddIdentityInputJSON => {
    return {
      identity: value.identity.toJSON()
    };
  }
  
  static fromJSON = (value: AuthProtectedServiceAddIdentityInputJSON): AuthProtectedServiceAddIdentityInput => {
    return new AuthProtectedServiceAddIdentityInput({
      identity: SecondaryIdentity.fromJSON(value.identity)
    });
  }
  
}