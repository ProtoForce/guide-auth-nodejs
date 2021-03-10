// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice.models

import {
  AuthProtectedServiceListIdentitiesInputJSON
} from '../../codecs/authprotectedservice/models/AuthProtectedServiceListIdentitiesInputJSON';
import {
  WithRTTI,
  RestSpec,
  HTTPMethod
} from '../../../../../../irt';

export interface AuthProtectedServiceListIdentitiesInputDefn extends WithRTTI {
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): AuthProtectedServiceListIdentitiesInputJSON;
}

/**
  * 
  *  List known identities
  * 
  * Class io.protoforce.guide.auth.authprotectedservice.models:ListIdentitiesInput
  * 
  * Defined at auth.service.pfm @ 136:3
  */
export class AuthProtectedServiceListIdentitiesInput implements AuthProtectedServiceListIdentitiesInputDefn {
  static readonly RTTI_CLASS: string = 'ListIdentitiesInput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authprotectedservice.models:ListIdentitiesInput';
  
  get RTTI_CLASS(): string {
    return AuthProtectedServiceListIdentitiesInput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthProtectedServiceListIdentitiesInput.RTTI_FQN;
  }
  
  static get restSpec(): RestSpec {
    return {
      method: HTTPMethod.GET,
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
      fields: []
    }
    };
  }
  
  toJSON(): AuthProtectedServiceListIdentitiesInputJSON {
    return AuthProtectedServiceListIdentitiesInput.toJSON(this);
  }
  
  static toJSON = (value: AuthProtectedServiceListIdentitiesInput): AuthProtectedServiceListIdentitiesInputJSON => {
    return {};
  }
  
  static fromJSON = (value: AuthProtectedServiceListIdentitiesInputJSON): AuthProtectedServiceListIdentitiesInput => {
    return new AuthProtectedServiceListIdentitiesInput();
  }
  
}