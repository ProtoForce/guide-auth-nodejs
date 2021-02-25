// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  UserInfo
} from './UserInfo';
import {
  UserInfoCodec
} from './codecs/UserInfoCodec';
import {
  UserInfoImplJSON
} from './codecs/UserInfoImplJSON';

export class UserInfoImpl implements UserInfo {
  name: string;
  static readonly RTTI_CLASS: string = 'UserInfo';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:UserInfo';
  
  constructor(data?: {name: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.name = '';
      }
      return;
    }
    this.name = data.name;
  }
  
  get RTTI_CLASS(): string {
    return UserInfoImpl.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return UserInfoImpl.RTTI_FQN;
  }
  
  toUserInfo(): UserInfoImpl {
    return new UserInfoImpl({
      name: this.name
    });
  }
  
  toJSON(): UserInfoImplJSON {
    return UserInfoImpl.toJSON(this);
  }
  
  static toJSON = (value: UserInfoImpl): UserInfoImplJSON => {
    return {
      name: value.name
    };
  }
  
  static fromJSON = (value: UserInfoImplJSON): UserInfoImpl => {
    return new UserInfoImpl({
      name: value.name
    });
  }
  
}

UserInfoCodec.register(UserInfoImpl.RTTI_FQN, UserInfoImpl.fromJSON);