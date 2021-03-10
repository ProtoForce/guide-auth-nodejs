// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceChangePasswordInputJSON
} from '../../codecs/authservice/models/AuthServiceChangePasswordInputJSON';
import {
  WithRTTI,
  RestSpec,
  HTTPMethod
} from '../../../../../../irt';

export interface AuthServiceChangePasswordInputDefn extends WithRTTI {
  changeToken: string;
  password: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): AuthServiceChangePasswordInputJSON;
}

/**
  * 
  *  Change password
  * 
  * Class io.protoforce.guide.auth.authservice.models:ChangePasswordInput
  * 
  * Defined at auth.service.pfm @ 98:3
  */
export class AuthServiceChangePasswordInput implements AuthServiceChangePasswordInputDefn {
  changeToken: string;
  password: string;
  static readonly RTTI_CLASS: string = 'ChangePasswordInput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authservice.models:ChangePasswordInput';
  
  constructor(data: {changeToken: string, password: string}) {
    
    this.changeToken = data.changeToken;
    this.password = data.password;
  }
  
  get RTTI_CLASS(): string {
    return AuthServiceChangePasswordInput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthServiceChangePasswordInput.RTTI_FQN;
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
        value: 'change'
      }
                 
    ]
    }
         ,
      body: {
      fields: [
      {
        field: {
        name: 'changeToken',
        ref: {
        id: 'str',
        args: []
      }
      },
        path: []
      },
      {
        field: {
        name: 'password',
        ref: {
        id: 'str',
        args: []
      }
      },
        path: []
      }
    ]
    }
    };
  }
  
  toJSON(): AuthServiceChangePasswordInputJSON {
    return AuthServiceChangePasswordInput.toJSON(this);
  }
  
  static toJSON = (value: AuthServiceChangePasswordInput): AuthServiceChangePasswordInputJSON => {
    return {
      changeToken: value.changeToken,
      password: value.password
    };
  }
  
  static fromJSON = (value: AuthServiceChangePasswordInputJSON): AuthServiceChangePasswordInput => {
    return new AuthServiceChangePasswordInput({
      changeToken: value.changeToken,
      password: value.password
    });
  }
  
}