// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs

import {
  CodecError,
  JSONWithTypeNested,
  JSONWithTypeField,
  JSONConverter
} from '../../../../../irt';
import {
  UserInfo
} from '../UserInfo';
import {
  UserInfoImplJSON
} from './UserInfoImplJSON';


type UserInfoJSONCTOR = (value: UserInfoImplJSON) => UserInfo;

export class UserInfoCodec {
  private static registry: {[key: string]: UserInfoJSONCTOR} = {};
  
  static register(fqn: string, ctor: UserInfoJSONCTOR) {
    UserInfoCodec.registry[fqn] = ctor;
  }
  
  static deregister(fqn: string) {
    delete UserInfoCodec.registry[fqn];
  }
  
  static isRegistered(fqn: string): boolean {
    return fqn in UserInfoCodec.registry;
  }
  
  static getRegistered(): string[] {
    return Object.keys(UserInfoCodec.registry);
  }
  
  static fromFQN = (fqn: string, value: UserInfoImplJSON): UserInfo => {
    const ctor = UserInfoCodec.registry[fqn];
    if (!ctor) {
      throw new CodecError(`Unknown class name ${fqn} for interface UserInfo. Register at UserInfoCodec before it can be used.`);
    }
    return ctor(value);
  }
  
  static fromTypeNestedJSON = (value: JSONWithTypeNested<UserInfoImplJSON>): UserInfo => {
    const key = Object.keys(value)[0];
    const val = value[key];
    return UserInfoCodec.fromFQN(key, val);
  }
  
  static fromTypeFieldJSON = (value: JSONWithTypeField<UserInfoImplJSON>, field: string): UserInfo => {
    const keylen = Array.isArray(value[field]) ? value[field].length : 0;
    // @ts-ignore
    const key: string = keylen > 0 ? value[field][0] : value[field];
    const val = keylen > 1 ?
      {
        ...value,
        [field]: keylen === 2 ? value[field][1] : value[field].slice(1)
      } : value;
    
    return UserInfoCodec.fromFQN(
      key,
      val
    );
                
  }
  
  static fromJSON = (value: JSONWithTypeNested<UserInfoImplJSON>): UserInfo => {
    return UserInfoCodec.fromTypeNestedJSON(value);
  }
  
  static toTypeNestedJSON = (value: UserInfo): JSONWithTypeNested<UserInfoImplJSON> => {
    return JSONConverter.withTypeNested(value);
  }
  
  static toTypeFieldJSON = (value: UserInfo, field: string): JSONWithTypeField<UserInfoImplJSON> => {
    return JSONConverter.withTypeField(value, field);
  }
  
  static toJSON = (value: UserInfo): JSONWithTypeNested<UserInfoImplJSON> => {
    return UserInfoCodec.toTypeNestedJSON(value);
  }
  
}