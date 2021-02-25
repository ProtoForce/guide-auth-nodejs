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
  SecondaryIdentityEmail
} from './SecondaryIdentityEmail';
import {
  SecondaryIdentityEmailJSON
} from './codecs/SecondaryIdentityEmailJSON';
import {
  SecondaryIdentityFlatTypes
} from './SecondaryIdentityFlatTypes';
import {
  SecondaryIdentityJSON
} from './codecs/SecondaryIdentityJSON';
import {
  SecondaryIdentityPhone
} from './SecondaryIdentityPhone';
import {
  SecondaryIdentityPhoneJSON
} from './codecs/SecondaryIdentityPhoneJSON';
import {
  SecondaryIdentityTypes
} from './SecondaryIdentityTypes';

/**
  * 
  *  Secondary identities
  * 
  * ADT io.protoforce.guide.auth:SecondaryIdentity
  * 
  * Defined at identity.pfm @ 4:1
  */
export class SecondaryIdentity implements WithRTTI, IRTADT<SecondaryIdentityTypes, SecondaryIdentityFlatTypes> {
  value: SecondaryIdentityTypes;
  static readonly RTTI_CLASS: string = 'SecondaryIdentity';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:SecondaryIdentity';
  
  constructor(value?: {phone?: SecondaryIdentityPhone, email?: SecondaryIdentityEmail}, unambiguous?: SecondaryIdentityTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT SecondaryIdentity must have value provided during instantiation.');
      }
      this.value = unambiguous;
      return;
    }
    if (typeof value.phone !== 'undefined') {
      this.value = value.phone;
    } else 
    if (typeof value.email !== 'undefined') {
      this.value = value.email;
    } else {
    
      throw new Error('ADT SecondaryIdentity constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): SecondaryIdentityFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: SecondaryIdentityTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: SecondaryIdentityFlatTypes)=> T): T {
    return mapper(this.flatValue);
  }
  
  match<T>(whenPhone: (value: SecondaryIdentityPhone)=> T, whenEmail: (value: SecondaryIdentityEmail)=> T): T {
    const v = this.value;
    if (v instanceof SecondaryIdentityPhone) {
      return whenPhone(v);
    } else 
    if (v instanceof SecondaryIdentityEmail) {
      return whenEmail(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive match when type is '${typeof v}'`);
  }
  
  flatMatch<T = void>(whenPhone: (value: SecondaryIdentityPhone)=> T, whenEmail: (value: SecondaryIdentityEmail)=> T): T {
    const v = this.value;
    if (v instanceof SecondaryIdentityPhone) {
      return whenPhone(v);
    } else 
    if (v instanceof SecondaryIdentityEmail) {
      return whenEmail(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive flatMatch when type is '${typeof v}'`);
  }
  
  static fromPhone(value: SecondaryIdentityPhone): SecondaryIdentity {
    return new SecondaryIdentity({phone: value});
  }
  
  static fromEmail(value: SecondaryIdentityEmail): SecondaryIdentity {
    return new SecondaryIdentity({email: value});
  }
  
  static from(value: SecondaryIdentity | SecondaryIdentityTypes): SecondaryIdentity {
    return value instanceof SecondaryIdentity ? value : new SecondaryIdentity(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return SecondaryIdentity.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return SecondaryIdentity.RTTI_FQN;
  }
  
  toJSON(): SecondaryIdentityJSON {
    return SecondaryIdentity.toJSON(this);
  }
  
  static toJSON = (value: SecondaryIdentity): SecondaryIdentityJSON => {
    const v = value.value;
    if (v instanceof SecondaryIdentityPhone) {
      return JSONConverter.withTypeNested(v, 'Phone');
    } else 
    if (v instanceof SecondaryIdentityEmail) {
      return JSONConverter.withTypeNested(v, 'Email');
    } else {
      throw new CodecError('Inconsistent ADT internal type, value: ' + v);
    }
  }
  
  static fromJSON = (value: SecondaryIdentityJSON): SecondaryIdentity => {
    const key = Object.keys(value)[0];
    const val = value[key];
    switch (key) {
      case 'Phone': {
        const vc = val as SecondaryIdentityPhoneJSON;
        return SecondaryIdentity.fromPhone(SecondaryIdentityPhone.fromJSON(vc));
      }
      case 'Email': {
        const vc = val as SecondaryIdentityEmailJSON;
        return SecondaryIdentity.fromEmail(SecondaryIdentityEmail.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'SecondaryIdentity'`);
    }
  }
  
}