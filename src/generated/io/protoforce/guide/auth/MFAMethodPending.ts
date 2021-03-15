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
  MFAMethodPendingApp
} from './MFAMethodPendingApp';
import {
  MFAMethodPendingAppJSON
} from './codecs/MFAMethodPendingAppJSON';
import {
  MFAMethodPendingFlatTypes
} from './MFAMethodPendingFlatTypes';
import {
  MFAMethodPendingJSON
} from './codecs/MFAMethodPendingJSON';
import {
  MFAMethodPendingTypes
} from './MFAMethodPendingTypes';

/**
  * 
  *  MFA setup: pending MFA confirmation by a user
  * 
  * ADT io.protoforce.guide.auth:MFAMethodPending
  * 
  * Defined at auth.mfa.pfm @ 16:1
  */
export class MFAMethodPending implements WithRTTI, IRTADT<MFAMethodPendingTypes, MFAMethodPendingFlatTypes> {
  value: MFAMethodPendingTypes;
  static readonly RTTI_CLASS: string = 'MFAMethodPending';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:MFAMethodPending';
  
  constructor(value?: {app?: MFAMethodPendingApp}, unambiguous?: MFAMethodPendingTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT MFAMethodPending must have value provided during instantiation.');
      }
      this.value = unambiguous;
      return;
    }
    if (typeof value.app !== 'undefined') {
      this.value = value.app;
    } else {
    
      throw new Error('ADT MFAMethodPending constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): MFAMethodPendingFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: MFAMethodPendingTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: MFAMethodPendingFlatTypes)=> T): T {
    return mapper(this.flatValue);
  }
  
  match<T>(whenApp: (value: MFAMethodPendingApp)=> T): T {
    const v = this.value;
    if (v instanceof MFAMethodPendingApp) {
      return whenApp(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive match when type is '${typeof v}'`);
  }
  
  flatMatch<T = void>(whenApp: (value: MFAMethodPendingApp)=> T): T {
    const v = this.value;
    if (v instanceof MFAMethodPendingApp) {
      return whenApp(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive flatMatch when type is '${typeof v}'`);
  }
  
  static fromApp(value: MFAMethodPendingApp): MFAMethodPending {
    return new MFAMethodPending({app: value});
  }
  
  static from(value: MFAMethodPending | MFAMethodPendingTypes): MFAMethodPending {
    return value instanceof MFAMethodPending ? value : new MFAMethodPending(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return MFAMethodPending.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return MFAMethodPending.RTTI_FQN;
  }
  
  toJSON(): MFAMethodPendingJSON {
    return MFAMethodPending.toJSON(this);
  }
  
  static toJSON = (value: MFAMethodPending): MFAMethodPendingJSON => {
    const v = value.value;
    if (v instanceof MFAMethodPendingApp) {
      return JSONConverter.withTypeField<MFAMethodPendingApp, MFAMethodPendingAppJSON>(v, '$method', 'App');
    } else {
      throw new CodecError('Inconsistent ADT internal type, value: ' + v);
    }
  }
  
  static fromJSON = (value: MFAMethodPendingJSON): MFAMethodPending => {
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
        const vc = val as MFAMethodPendingAppJSON;
        return MFAMethodPending.fromApp(MFAMethodPendingApp.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'MFAMethodPending'`);
    }
  }
  
}