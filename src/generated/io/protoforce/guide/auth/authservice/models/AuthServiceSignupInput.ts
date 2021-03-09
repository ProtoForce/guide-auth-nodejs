// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceSignupInputJSON
} from '../../codecs/authservice/models/AuthServiceSignupInputJSON';
import {
  SignUp
} from '../../SignUp';
import {
  WithRTTI,
  RestSpec,
  HTTPMethod
} from '../../../../../../irt';

export interface AuthServiceSignupInputDefn extends WithRTTI {
  with_: SignUp;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): AuthServiceSignupInputJSON;
}

/**
  * 
  *  Sign up for a service with provided credentials
  * 
  * Class io.protoforce.guide.auth.authservice.models:SignupInput
  * 
  * Defined at auth.service.pfm @ 72:3
  */
export class AuthServiceSignupInput implements AuthServiceSignupInputDefn {
  with_: SignUp;
  static readonly RTTI_CLASS: string = 'SignupInput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authservice.models:SignupInput';
  
  constructor(data: {with_: SignUp}) {
    
    this.with_ = data.with_;
  }
  
  get RTTI_CLASS(): string {
    return AuthServiceSignupInput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthServiceSignupInput.RTTI_FQN;
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
        value: 'signup'
      }
                 
    ]
    }
         ,
      body: {
      fields: [
      {
        field: {
        name: 'with',
        ref: {
        id: 'SignUp',
        args: []
      }
      },
        path: []
      }
    ]
    }
    };
  }
  
  toJSON(): AuthServiceSignupInputJSON {
    return AuthServiceSignupInput.toJSON(this);
  }
  
  static toJSON = (value: AuthServiceSignupInput): AuthServiceSignupInputJSON => {
    return {
      with: value.with_.toJSON()
    };
  }
  
  static fromJSON = (value: AuthServiceSignupInputJSON): AuthServiceSignupInput => {
    return new AuthServiceSignupInput({
      with_: SignUp.fromJSON(value.with)
    });
  }
  
}