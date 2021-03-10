// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceRemoveIdentityInputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceRemoveIdentityInputJSON';
import {
  SecondaryIdentity
} from '../../SecondaryIdentity';
import {
  WithRTTI,
  RestSpec,
  HTTPMethod
} from '../../../../../../irt';

export interface AuthProtectedServiceRemoveIdentityInputDefn extends WithRTTI {
  identity: SecondaryIdentity;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): AuthProtectedServiceRemoveIdentityInputJSON;
}

/**
  * 
  *  Remove secondary identity
  * 
  * Class io.protoforce.guide.auth.authprotectedservice.models:RemoveIdentityInput
  * 
  * Defined at auth.service.pfm @ 131:3
  */
export class AuthProtectedServiceRemoveIdentityInput implements AuthProtectedServiceRemoveIdentityInputDefn {
  identity: SecondaryIdentity;
  static readonly RTTI_CLASS: string = 'RemoveIdentityInput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authprotectedservice.models:RemoveIdentityInput';
  
  constructor(data: {identity: SecondaryIdentity}) {
    
    this.identity = data.identity;
  }
  
  get RTTI_CLASS(): string {
    return AuthProtectedServiceRemoveIdentityInput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthProtectedServiceRemoveIdentityInput.RTTI_FQN;
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
  
  toJSON(): AuthProtectedServiceRemoveIdentityInputJSON {
    return AuthProtectedServiceRemoveIdentityInput.toJSON(this);
  }
  
  static toJSON = (value: AuthProtectedServiceRemoveIdentityInput): AuthProtectedServiceRemoveIdentityInputJSON => {
    return {
      identity: value.identity.toJSON()
    };
  }
  
  static fromJSON = (value: AuthProtectedServiceRemoveIdentityInputJSON): AuthProtectedServiceRemoveIdentityInput => {
    return new AuthProtectedServiceRemoveIdentityInput({
      identity: SecondaryIdentity.fromJSON(value.identity)
    });
  }
  
}