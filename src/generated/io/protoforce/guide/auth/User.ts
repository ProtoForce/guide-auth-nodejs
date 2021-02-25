// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  UserID
} from './UserID';
import {
  UserInfo
} from './UserInfo';
import {
  UserInfoImpl
} from './UserInfoImpl';
import {
  UserJSON
} from './codecs/UserJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface UserDefn extends WithRTTI {
  name: string;
  id: UserID;
  /**
    * Verified user is the one who signed up with a provider which validated
    *    their emails, or when a user manually validates their email, phone, etc.
    *    If a user has many secondary identities, this boolean denotes when they
    *    have at least one secondary identity verified.
    */
  verified: boolean;
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): UserJSON;
}

/**
  * 
  *  Complete user data
  * 
  * Class io.protoforce.guide.auth:User
  * 
  * Defined at user.pfm @ 19:1
  */
export class User implements UserDefn {
  name: string;
  id: UserID;
  /**
    * Verified user is the one who signed up with a provider which validated
    *    their emails, or when a user manually validates their email, phone, etc.
    *    If a user has many secondary identities, this boolean denotes when they
    *    have at least one secondary identity verified.
    */
  verified: boolean;
  static readonly RTTI_CLASS: string = 'User';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:User';
  
  constructor(data?: {name: string, id: UserID, /**
    * Verified user is the one who signed up with a provider which validated
    *    their emails, or when a user manually validates their email, phone, etc.
    *    If a user has many secondary identities, this boolean denotes when they
    *    have at least one secondary identity verified.
    */
  verified: boolean}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.name = '';
        this.verified = false;
      }
      return;
    }
    this.name = data.name;
    this.id = data.id;
    this.verified = data.verified;
  }
  
  get RTTI_CLASS(): string {
    return User.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return User.RTTI_FQN;
  }
  
  static fromUserInfo(from: UserInfo, id: UserID, verified: boolean): User {
    return new User({
      id: id,
      verified: verified,
      name: from.name
    });
  }
  
  loadUserInfo(from: UserInfo): void {
    this.name = from.name;
  }
  
  toUserInfo(): UserInfoImpl {
    return new UserInfoImpl({
      name: this.name
    });
  }
  
  toJSON(): UserJSON {
    return User.toJSON(this);
  }
  
  static toJSON = (value: User): UserJSON => {
    return {
      name: value.name,
      id: value.id.toJSON(),
      verified: value.verified
    };
  }
  
  static fromJSON = (value: UserJSON): User => {
    return new User({
      name: value.name,
      id: UserID.fromJSON(value.id),
      verified: value.verified
    });
  }
  
}