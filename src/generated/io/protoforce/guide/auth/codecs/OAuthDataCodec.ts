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
  OAuthData
} from '../OAuthData';
import {
  OAuthDataImplJSON
} from './OAuthDataImplJSON';


type OAuthDataJSONCTOR = (value: OAuthDataImplJSON) => OAuthData;

export class OAuthDataCodec {
  private static registry: {[key: string]: OAuthDataJSONCTOR} = {};
  
  static register(fqn: string, ctor: OAuthDataJSONCTOR) {
    OAuthDataCodec.registry[fqn] = ctor;
  }
  
  static deregister(fqn: string) {
    delete OAuthDataCodec.registry[fqn];
  }
  
  static isRegistered(fqn: string): boolean {
    return fqn in OAuthDataCodec.registry;
  }
  
  static getRegistered(): string[] {
    return Object.keys(OAuthDataCodec.registry);
  }
  
  static fromFQN = (fqn: string, value: OAuthDataImplJSON): OAuthData => {
    const ctor = OAuthDataCodec.registry[fqn];
    if (!ctor) {
      throw new CodecError(`Unknown class name ${fqn} for interface OAuthData. Register at OAuthDataCodec before it can be used.`);
    }
    return ctor(value);
  }
  
  static fromTypeNestedJSON = (value: JSONWithTypeNested<OAuthDataImplJSON>): OAuthData => {
    const key = Object.keys(value)[0];
    const val = value[key];
    return OAuthDataCodec.fromFQN(key, val);
  }
  
  static fromTypeFieldJSON = (value: JSONWithTypeField<OAuthDataImplJSON>, field: string): OAuthData => {
    const keylen = Array.isArray(value[field]) ? value[field].length : 0;
    // @ts-ignore
    const key: string = keylen > 0 ? value[field][0] : value[field];
    const val = keylen > 1 ?
      {
        ...value,
        [field]: keylen === 2 ? value[field][1] : value[field].slice(1)
      } : value;
    
    return OAuthDataCodec.fromFQN(
      key,
      val
    );
                
  }
  
  static fromJSON = (value: JSONWithTypeNested<OAuthDataImplJSON>): OAuthData => {
    return OAuthDataCodec.fromTypeNestedJSON(value);
  }
  
  static toTypeNestedJSON = (value: OAuthData): JSONWithTypeNested<OAuthDataImplJSON> => {
    return JSONConverter.withTypeNested(value);
  }
  
  static toTypeFieldJSON = (value: OAuthData, field: string): JSONWithTypeField<OAuthDataImplJSON> => {
    return JSONConverter.withTypeField(value, field);
  }
  
  static toJSON = (value: OAuthData): JSONWithTypeNested<OAuthDataImplJSON> => {
    return OAuthDataCodec.toTypeNestedJSON(value);
  }
  
}