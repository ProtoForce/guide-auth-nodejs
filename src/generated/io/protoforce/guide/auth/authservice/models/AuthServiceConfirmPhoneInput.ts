// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceConfirmPhoneInputJSON
} from '../../codecs/authservice/models/AuthServiceConfirmPhoneInputJSON';
import {
  WithRTTI,
  RestSpec,
  HTTPMethod
} from '../../../../../../irt';

export interface AuthServiceConfirmPhoneInputDefn extends WithRTTI {
  code: string;
  phone: string;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): AuthServiceConfirmPhoneInputJSON;
}

/**
  * 
  *  Confirm phone number
  * 
  * Class io.protoforce.guide.auth.authservice.models:ConfirmPhoneInput
  * 
  * Defined at auth.service.pfm @ 88:3
  */
export class AuthServiceConfirmPhoneInput implements AuthServiceConfirmPhoneInputDefn {
  code: string;
  phone: string;
  static readonly RTTI_CLASS: string = 'ConfirmPhoneInput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authservice.models:ConfirmPhoneInput';
  
  constructor(data: {code: string, phone: string}) {
    
    this.code = data.code;
    this.phone = data.phone;
  }
  
  get RTTI_CLASS(): string {
    return AuthServiceConfirmPhoneInput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthServiceConfirmPhoneInput.RTTI_FQN;
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
        value: 'phone'
      }
                 ,
      {
        type: 'param',
        field: {
        name: 'phone',
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
  
  toJSON(): AuthServiceConfirmPhoneInputJSON {
    return AuthServiceConfirmPhoneInput.toJSON(this);
  }
  
  static toJSON = (value: AuthServiceConfirmPhoneInput): AuthServiceConfirmPhoneInputJSON => {
    return {
      code: value.code,
      phone: value.phone
    };
  }
  
  static fromJSON = (value: AuthServiceConfirmPhoneInputJSON): AuthServiceConfirmPhoneInput => {
    return new AuthServiceConfirmPhoneInput({
      code: value.code,
      phone: value.phone
    });
  }
  
}