// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  JSONConverter,
  CodecError,
  WithRTTI,
  IRTADT
} from '../../../../irt';
import {
  UserID
} from './UserID';
import {
  UserLookupEmail
} from './UserLookupEmail';
import {
  UserLookupEmailJSON
} from './codecs/UserLookupEmailJSON';
import {
  UserLookupFlatTypes
} from './UserLookupFlatTypes';
import {
  UserLookupJSON
} from './codecs/UserLookupJSON';
import {
  UserLookupPhone
} from './UserLookupPhone';
import {
  UserLookupPhoneJSON
} from './codecs/UserLookupPhoneJSON';
import {
  UserLookupTypes
} from './UserLookupTypes';

/**
  * 
  *  User lookup options
  * 
  * ADT io.protoforce.guide.auth:UserLookup
  * 
  * Defined at auth.service.pfm @ 49:1
  */
export class UserLookup implements WithRTTI, IRTADT<UserLookupTypes, UserLookupFlatTypes> {
  value: UserLookupTypes;
  static readonly RTTI_CLASS: string = 'UserLookup';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:UserLookup';
  
  constructor(value?: {userID?: UserID, email?: UserLookupEmail, phone?: UserLookupPhone}, unambiguous?: UserLookupTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT UserLookup must have value provided during instantiation.');
      }
      this.value = unambiguous;
      return;
    }
    if (typeof value.userID !== 'undefined') {
      this.value = value.userID;
    } else 
    if (typeof value.email !== 'undefined') {
      this.value = value.email;
    } else 
    if (typeof value.phone !== 'undefined') {
      this.value = value.phone;
    } else {
    
      throw new Error('ADT UserLookup constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): UserLookupFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: UserLookupTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: UserLookupFlatTypes)=> T): T {
    return mapper(this.flatValue);
  }
  
  match<T>(whenUserID: (value: UserID)=> T, whenEmail: (value: UserLookupEmail)=> T, whenPhone: (value: UserLookupPhone)=> T): T {
    const v = this.value;
    if (v instanceof UserID) {
      return whenUserID(v);
    } else 
    if (v instanceof UserLookupEmail) {
      return whenEmail(v);
    } else 
    if (v instanceof UserLookupPhone) {
      return whenPhone(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive match when type is '${typeof v}'`);
  }
  
  flatMatch<T = void>(whenUserID: (value: UserID)=> T, whenEmail: (value: UserLookupEmail)=> T, whenPhone: (value: UserLookupPhone)=> T): T {
    const v = this.value;
    if (v instanceof UserID) {
      return whenUserID(v);
    } else 
    if (v instanceof UserLookupEmail) {
      return whenEmail(v);
    } else 
    if (v instanceof UserLookupPhone) {
      return whenPhone(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive flatMatch when type is '${typeof v}'`);
  }
  
  static fromUserID(value: UserID): UserLookup {
    return new UserLookup({userID: value});
  }
  
  static fromEmail(value: UserLookupEmail): UserLookup {
    return new UserLookup({email: value});
  }
  
  static fromPhone(value: UserLookupPhone): UserLookup {
    return new UserLookup({phone: value});
  }
  
  static from(value: UserLookup | UserLookupTypes): UserLookup {
    return value instanceof UserLookup ? value : new UserLookup(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return UserLookup.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return UserLookup.RTTI_FQN;
  }
  
  toJSON(): UserLookupJSON {
    return UserLookup.toJSON(this);
  }
  
  static toJSON = (value: UserLookup): UserLookupJSON => {
    const v = value.value;
    if (v instanceof UserID) {
      return JSONConverter.withTypeField<UserID, string>(v, '$method', 'UserID');
    } else 
    if (v instanceof UserLookupEmail) {
      return JSONConverter.withTypeField<UserLookupEmail, UserLookupEmailJSON>(v, '$method', 'Email');
    } else 
    if (v instanceof UserLookupPhone) {
      return JSONConverter.withTypeField<UserLookupPhone, UserLookupPhoneJSON>(v, '$method', 'Phone');
    } else {
      throw new CodecError('Inconsistent ADT internal type, value: ' + v);
    }
  }
  
  static fromJSON = (value: UserLookupJSON): UserLookup => {
    const keyarr = Array.isArray(value.$method) ? value.$method : [value.$method];
    const key = keyarr[0];
    const val = (keyarr.length > 1 ?
      {
        ...value,
        $method: keyarr.length === 2 ? keyarr[1] : keyarr.slice(1)
      } : value) as UserLookupJSON;
             
    switch (key) {
      case 'UserID': {
        const vc = val as string;
        return UserLookup.fromUserID(UserID.fromJSON(vc));
      }
      case 'Email': {
        const vc = val as UserLookupEmailJSON;
        return UserLookup.fromEmail(UserLookupEmail.fromJSON(vc));
      }
      case 'Phone': {
        const vc = val as UserLookupPhoneJSON;
        return UserLookup.fromPhone(UserLookupPhone.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'UserLookup'`);
    }
  }
  
}