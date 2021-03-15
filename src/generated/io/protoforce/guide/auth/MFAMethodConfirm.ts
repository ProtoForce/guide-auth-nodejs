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
  MFAMethodConfirmApp
} from './MFAMethodConfirmApp';
import {
  MFAMethodConfirmAppJSON
} from './codecs/MFAMethodConfirmAppJSON';
import {
  MFAMethodConfirmFlatTypes
} from './MFAMethodConfirmFlatTypes';
import {
  MFAMethodConfirmJSON
} from './codecs/MFAMethodConfirmJSON';
import {
  MFAMethodConfirmTypes
} from './MFAMethodConfirmTypes';

/**
  * 
  *  MFA setup: confirming previously requested MFA method
  * 
  * ADT io.protoforce.guide.auth:MFAMethodConfirm
  * 
  * Defined at auth.mfa.pfm @ 38:1
  */
export class MFAMethodConfirm implements WithRTTI, IRTADT<MFAMethodConfirmTypes, MFAMethodConfirmFlatTypes> {
  value: MFAMethodConfirmTypes;
  static readonly RTTI_CLASS: string = 'MFAMethodConfirm';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:MFAMethodConfirm';
  
  constructor(value?: {app?: MFAMethodConfirmApp}, unambiguous?: MFAMethodConfirmTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT MFAMethodConfirm must have value provided during instantiation.');
      }
      this.value = unambiguous;
      return;
    }
    if (typeof value.app !== 'undefined') {
      this.value = value.app;
    } else {
    
      throw new Error('ADT MFAMethodConfirm constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): MFAMethodConfirmFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: MFAMethodConfirmTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: MFAMethodConfirmFlatTypes)=> T): T {
    return mapper(this.flatValue);
  }
  
  match<T>(whenApp: (value: MFAMethodConfirmApp)=> T): T {
    const v = this.value;
    if (v instanceof MFAMethodConfirmApp) {
      return whenApp(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive match when type is '${typeof v}'`);
  }
  
  flatMatch<T = void>(whenApp: (value: MFAMethodConfirmApp)=> T): T {
    const v = this.value;
    if (v instanceof MFAMethodConfirmApp) {
      return whenApp(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive flatMatch when type is '${typeof v}'`);
  }
  
  static fromApp(value: MFAMethodConfirmApp): MFAMethodConfirm {
    return new MFAMethodConfirm({app: value});
  }
  
  static from(value: MFAMethodConfirm | MFAMethodConfirmTypes): MFAMethodConfirm {
    return value instanceof MFAMethodConfirm ? value : new MFAMethodConfirm(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return MFAMethodConfirm.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return MFAMethodConfirm.RTTI_FQN;
  }
  
  toJSON(): MFAMethodConfirmJSON {
    return MFAMethodConfirm.toJSON(this);
  }
  
  static toJSON = (value: MFAMethodConfirm): MFAMethodConfirmJSON => {
    const v = value.value;
    if (v instanceof MFAMethodConfirmApp) {
      return JSONConverter.withTypeField<MFAMethodConfirmApp, MFAMethodConfirmAppJSON>(v, '$method', 'App');
    } else {
      throw new CodecError('Inconsistent ADT internal type, value: ' + v);
    }
  }
  
  static fromJSON = (value: MFAMethodConfirmJSON): MFAMethodConfirm => {
    const keyarr = Array.isArray(value.$method) ? value.$method : [value.$method];
    const key = keyarr[0];
    const val = keyarr.length > 1 ?
       Object.assign(
         {},
         value,
         {'$method': keyarr.length === 2 ? keyarr[1] : keyarr.slice(1)}
       ) : value;
             
    switch (key) {
      case 'App': {
        const vc = val as MFAMethodConfirmAppJSON;
        return MFAMethodConfirm.fromApp(MFAMethodConfirmApp.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'MFAMethodConfirm'`);
    }
  }
  
}