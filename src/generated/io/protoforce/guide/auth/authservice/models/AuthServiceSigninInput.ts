// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authservice.models

import {
  AuthServiceSigninInputJSON
} from '../../codecs/authservice/models/AuthServiceSigninInputJSON';
import {
  SignIn
} from '../../SignIn';
import {
  WithRTTI,
  RestSpec,
  HTTPMethod
} from '../../../../../../irt';

export interface AuthServiceSigninInputDefn extends WithRTTI {
  with_: SignIn;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): AuthServiceSigninInputJSON;
}

/**
  * 
  *  Sign in with provided credentials
  * 
  * Class io.protoforce.guide.auth.authservice.models:SigninInput
  * 
  * Defined at auth.service.pfm @ 78:3
  */
export class AuthServiceSigninInput implements AuthServiceSigninInputDefn {
  with_: SignIn;
  static readonly RTTI_CLASS: string = 'SigninInput';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authservice.models:SigninInput';
  
  constructor(data: {with_: SignIn}) {
    
    this.with_ = data.with_;
  }
  
  get RTTI_CLASS(): string {
    return AuthServiceSigninInput.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthServiceSigninInput.RTTI_FQN;
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
        value: 'signin'
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
        id: 'SignIn',
        args: []
      }
      },
        path: []
      }
    ]
    }
    };
  }
  
  toJSON(): AuthServiceSigninInputJSON {
    return AuthServiceSigninInput.toJSON(this);
  }
  
  static toJSON = (value: AuthServiceSigninInput): AuthServiceSigninInputJSON => {
    return {
      with: value.with_.toJSON()
    };
  }
  
  static fromJSON = (value: AuthServiceSigninInputJSON): AuthServiceSigninInput => {
    return new AuthServiceSigninInput({
      with_: SignIn.fromJSON(value.with)
    });
  }
  
}