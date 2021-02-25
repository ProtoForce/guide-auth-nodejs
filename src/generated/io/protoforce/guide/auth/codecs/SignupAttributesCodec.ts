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
  SignupAttributes
} from '../SignupAttributes';
import {
  SignupAttributesImplJSON
} from './SignupAttributesImplJSON';


type SignupAttributesJSONCTOR = (value: SignupAttributesImplJSON) => SignupAttributes;

export class SignupAttributesCodec {
  private static registry: {[key: string]: SignupAttributesJSONCTOR} = {};
  
  static register(fqn: string, ctor: SignupAttributesJSONCTOR) {
    SignupAttributesCodec.registry[fqn] = ctor;
  }
  
  static deregister(fqn: string) {
    delete SignupAttributesCodec.registry[fqn];
  }
  
  static isRegistered(fqn: string): boolean {
    return fqn in SignupAttributesCodec.registry;
  }
  
  static getRegistered(): string[] {
    return Object.keys(SignupAttributesCodec.registry);
  }
  
  static fromFQN = (fqn: string, value: SignupAttributesImplJSON): SignupAttributes => {
    const ctor = SignupAttributesCodec.registry[fqn];
    if (!ctor) {
      throw new CodecError(`Unknown class name ${fqn} for interface SignupAttributes. Register at SignupAttributesCodec before it can be used.`);
    }
    return ctor(value);
  }
  
  static fromTypeNestedJSON = (value: JSONWithTypeNested<SignupAttributesImplJSON>): SignupAttributes => {
    const key = Object.keys(value)[0];
    const val = value[key];
    return SignupAttributesCodec.fromFQN(key, val);
  }
  
  static fromTypeFieldJSON = (value: JSONWithTypeField<SignupAttributesImplJSON>, field: string): SignupAttributes => {
    const keylen = Array.isArray(value[field]) ? value[field].length : 0;
    // @ts-ignore
    const key: string = keylen > 0 ? value[field][0] : value[field];
    const val = keylen > 1 ?
      {
        ...value,
        [field]: keylen === 2 ? value[field][1] : value[field].slice(1)
      } : value;
    
    return SignupAttributesCodec.fromFQN(
      key,
      val
    );
                
  }
  
  static fromJSON = (value: JSONWithTypeNested<SignupAttributesImplJSON>): SignupAttributes => {
    return SignupAttributesCodec.fromTypeNestedJSON(value);
  }
  
  static toTypeNestedJSON = (value: SignupAttributes): JSONWithTypeNested<SignupAttributesImplJSON> => {
    return JSONConverter.withTypeNested(value);
  }
  
  static toTypeFieldJSON = (value: SignupAttributes, field: string): JSONWithTypeField<SignupAttributesImplJSON> => {
    return JSONConverter.withTypeField(value, field);
  }
  
  static toJSON = (value: SignupAttributes): JSONWithTypeNested<SignupAttributesImplJSON> => {
    return SignupAttributesCodec.toTypeNestedJSON(value);
  }
  
}