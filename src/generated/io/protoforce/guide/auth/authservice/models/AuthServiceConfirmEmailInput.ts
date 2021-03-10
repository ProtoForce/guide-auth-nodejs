// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceConfirmEmailInputJSON
} from '../../codecs/authservice/models/AuthServiceConfirmEmailInputJSON';
import {
  WithRTTI,
  RestSpec,
  HTTPMethod
} from '../../../../../../irt';

export interface AuthServiceConfirmEmailInputDefn extends WithRTTI {
  code: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): AuthServiceConfirmEmailInputJSON;
}

/**
  * 
  *  Confirm email
  * 
  * Class io.protoforce.guide.auth.authservice.models:ConfirmEmailInput
  * 
  * Defined at auth.service.pfm @ 83:3
  */
export class AuthServiceConfirmEmailInput implements AuthServiceConfirmEmailInputDefn {
  code: string;
  static readonly RTTI_CLASS: string = 'ConfirmEmailInput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authservice.models:ConfirmEmailInput';
  
  constructor(data: {code: string}) {
    
    this.code = data.code;
  }
  
  get RTTI_CLASS(): string {
    return AuthServiceConfirmEmailInput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthServiceConfirmEmailInput.RTTI_FQN;
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
        value: 'confirm'
      }
                 ,
      {
        type: 'word',
        value: 'email'
      }
                 ,
      {
        type: 'param',
        field: {
        name: 'code',
        ref: {
        id: 'str',
        args: []
      }
      },
        path: [],
        onWire: {
        type: 'scalar',
        ref: {
        id: 'str',
        args: []
      },
      }
      }
                 
    ]
    }
         ,
      body: {
      fields: []
    }
    };
  }
  
  toJSON(): AuthServiceConfirmEmailInputJSON {
    return AuthServiceConfirmEmailInput.toJSON(this);
  }
  
  static toJSON = (value: AuthServiceConfirmEmailInput): AuthServiceConfirmEmailInputJSON => {
    return {
      code: value.code
    };
  }
  
  static fromJSON = (value: AuthServiceConfirmEmailInputJSON): AuthServiceConfirmEmailInput => {
    return new AuthServiceConfirmEmailInput({
      code: value.code
    });
  }
  
}