// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceResetPasswordInputJSON
} from '../../codecs/authservice/models/AuthServiceResetPasswordInputJSON';
import {
  UserLookup
} from '../../UserLookup';
import {
  WithRTTI,
  RestSpec,
  HTTPMethod
} from '../../../../../../irt';

export interface AuthServiceResetPasswordInputDefn extends WithRTTI {
  lookup: UserLookup;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): AuthServiceResetPasswordInputJSON;
}

/**
  * 
  *  Reset password
  * 
  * Class io.protoforce.guide.auth.authservice.models:ResetPasswordInput
  * 
  * Defined at auth.service.pfm @ 93:3
  */
export class AuthServiceResetPasswordInput implements AuthServiceResetPasswordInputDefn {
  lookup: UserLookup;
  static readonly RTTI_CLASS: string = 'ResetPasswordInput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authservice.models:ResetPasswordInput';
  
  constructor(data: {lookup: UserLookup}) {
    
    this.lookup = data.lookup;
  }
  
  get RTTI_CLASS(): string {
    return AuthServiceResetPasswordInput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthServiceResetPasswordInput.RTTI_FQN;
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
        value: 'pass'
      }
                 ,
      {
        type: 'word',
        value: 'reset'
      }
                 
    ]
    }
         ,
      body: {
      fields: [
      {
        field: {
        name: 'lookup',
        ref: {
        id: 'UserLookup',
        args: []
      }
      },
        path: []
      }
    ]
    }
    };
  }
  
  toJSON(): AuthServiceResetPasswordInputJSON {
    return AuthServiceResetPasswordInput.toJSON(this);
  }
  
  static toJSON = (value: AuthServiceResetPasswordInput): AuthServiceResetPasswordInputJSON => {
    return {
      lookup: value.lookup.toJSON()
    };
  }
  
  static fromJSON = (value: AuthServiceResetPasswordInputJSON): AuthServiceResetPasswordInput => {
    return new AuthServiceResetPasswordInput({
      lookup: UserLookup.fromJSON(value.lookup)
    });
  }
  
}