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
  MFAMethodRequestApp
} from './MFAMethodRequestApp';
import {
  MFAMethodRequestAppJSON
} from './codecs/MFAMethodRequestAppJSON';
import {
  MFAMethodRequestFlatTypes
} from './MFAMethodRequestFlatTypes';
import {
  MFAMethodRequestJSON
} from './codecs/MFAMethodRequestJSON';
import {
  MFAMethodRequestTypes
} from './MFAMethodRequestTypes';

/**
  * 
  *  MFA setup: request to enable MFA via provided method
  * 
  * ADT io.protoforce.guide.auth:MFAMethodRequest
  * 
  * Defined at auth.mfa.pfm @ 5:1
  */
export class MFAMethodRequest implements WithRTTI, IRTADT<MFAMethodRequestTypes, MFAMethodRequestFlatTypes> {
  value: MFAMethodRequestTypes;
  static readonly RTTI_CLASS: string = 'MFAMethodRequest';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:MFAMethodRequest';
  
  constructor(value?: {app?: MFAMethodRequestApp}, unambiguous?: MFAMethodRequestTypes | undefined) {
    if (!value) {
      if (!unambiguous) {
        throw new Error('ADT MFAMethodRequest must have value provided during instantiation.');
      }
      this.value = unambiguous;
      return;
    }
    if (typeof value.app !== 'undefined') {
      this.value = value.app;
    } else {
    
      throw new Error('ADT MFAMethodRequest constructor value must have at least one field defined')
    }
  }
  
  get flatValue(): MFAMethodRequestFlatTypes {
    return this.value;
  }
  
  map<T>(mapper: (value: MFAMethodRequestTypes)=> T): T {
    return mapper(this.value);
  }
  
  flatMap<T>(mapper: (value: MFAMethodRequestFlatTypes)=> T): T {
    return mapper(this.flatValue);
  }
  
  match<T>(whenApp: (value: MFAMethodRequestApp)=> T): T {
    const v = this.value;
    if (v instanceof MFAMethodRequestApp) {
      return whenApp(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive match when type is '${typeof v}'`);
  }
  
  flatMatch<T = void>(whenApp: (value: MFAMethodRequestApp)=> T): T {
    const v = this.value;
    if (v instanceof MFAMethodRequestApp) {
      return whenApp(v);
    }
    
    throw new Error(`Inconsistent ADT instance, non exhaustive flatMatch when type is '${typeof v}'`);
  }
  
  static fromApp(value: MFAMethodRequestApp): MFAMethodRequest {
    return new MFAMethodRequest({app: value});
  }
  
  static from(value: MFAMethodRequest | MFAMethodRequestTypes): MFAMethodRequest {
    return value instanceof MFAMethodRequest ? value : new MFAMethodRequest(undefined, value);
  }
  
  get RTTI_CLASS(): string {
    return MFAMethodRequest.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return MFAMethodRequest.RTTI_FQN;
  }
  
  toJSON(): MFAMethodRequestJSON {
    return MFAMethodRequest.toJSON(this);
  }
  
  static toJSON = (value: MFAMethodRequest): MFAMethodRequestJSON => {
    const v = value.value;
    if (v instanceof MFAMethodRequestApp) {
      return JSONConverter.withTypeField<MFAMethodRequestApp, MFAMethodRequestAppJSON>(v, '$method', 'App');
    } else {
      throw new CodecError('Inconsistent ADT internal type, value: ' + v);
    }
  }
  
  static fromJSON = (value: MFAMethodRequestJSON): MFAMethodRequest => {
    const keyarr = Array.isArray(value.$method) ? value.$method : [value.$method];
    const key = keyarr[0];
    const val = (keyarr.length > 1 ?
      {
        ...value,
        $method: keyarr.length === 2 ? keyarr[1] : keyarr.slice(1)
      } : value) as MFAMethodRequestJSON;
             
    switch (key) {
      case 'App': {
        const vc = val as MFAMethodRequestAppJSON;
        return MFAMethodRequest.fromApp(MFAMethodRequestApp.fromJSON(vc));
      }
      default: throw new CodecError(`Unexpected key '${key}' for ADT 'MFAMethodRequest'`);
    }
  }
  
}