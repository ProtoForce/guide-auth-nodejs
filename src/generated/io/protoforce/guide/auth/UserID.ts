// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  UUIDDefault,
  Validator,
  CodecError,
  WithRTTI
} from '../../../../irt';

/**
  * 
  *  User identifier
  * 
  * Identifier io.protoforce.guide.auth:UserID
  * 
  * Defined at user.pfm @ 5:1
  */
export class UserID implements WithRTTI {
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  private _id: string;
  static readonly RTTI_CLASS: string = 'UserID';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:UserID';
  
  constructor(data?: {id: string}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.id = UUIDDefault;
      }
      return;
    }
    this.id = data.id;
  }
  
  get id(): string {
    return this._id;
  }
  
  set id(value: string) {
    Validator.guid(value, 'id');
    this._id = value;
  }
  
  get RTTI_CLASS(): string {
    return UserID.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return UserID.RTTI_FQN;
  }
  
  toJSON(): string {
    return UserID.toJSON(this);
  }
  
  static toJSON = (value: UserID): string => {
    const kvs = [
      `id=${encodeURIComponent(value.id)}`
    ];
    return `${UserID.RTTI_CLASS}#${kvs.join(';')}`;
  }
  
  static fromJSON = (value: string): UserID => {
    const err = `Identifier ${UserID.RTTI_CLASS}.fromJSON input (${value}) is malformed.`;
    
    const chunks = value.split('#');
    if (chunks.length !== 2) {
      throw new CodecError(err);
    }
    
    if (chunks[0] !== UserID.RTTI_CLASS) {
      throw new CodecError(`${err} Expected to start with '${UserID.RTTI_CLASS}#'`);
    }
    
    const values = chunks[1].split(';');
    if (values.length !== 1) {
      throw new CodecError(`${err} Expects 1 key values, got ${values.length}`);
    }
    
    const valueMap: {[key: string]: string} = {};
    for (let i = 0; i < values.length; i++) {
      const kv = values[i].split('=');
      if (kv.length !== 2) {
        throw new CodecError(`${err} Must have key=value pairs comma separated.`);
      }
      valueMap[kv[0]] = kv[1];
    }
    
    const data = {
      id: decodeURIComponent(valueMap['id'])
    };
    return new UserID(data);
  }
  
}