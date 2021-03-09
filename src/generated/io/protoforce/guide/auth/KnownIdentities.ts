// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  KnownIdentitiesJSON
} from './codecs/KnownIdentitiesJSON';
import {
  SecondaryIdentity
} from './SecondaryIdentity';
import {
  SecondaryIdentityJSON
} from './codecs/SecondaryIdentityJSON';
import {
  WithRTTI
} from '../../../../irt';

export interface KnownIdentitiesDefn extends WithRTTI {
  /**
    * Confirmed identities
    */
  confirmed: SecondaryIdentity[];
  /**
    * Unconfirmed identities
    */
  unconfirmed: SecondaryIdentity[];
  readonly RTTI_CLASS: string;
  readonly RTTI_FQN: string;
  
  toJSON(): KnownIdentitiesJSON;
}

/**
  * 
  *  All known identities of a particular user
  * 
  * Class io.protoforce.guide.auth:KnownIdentities
  * 
  * Defined at identity.pfm @ 28:1
  */
export class KnownIdentities implements KnownIdentitiesDefn {
  /**
    * Confirmed identities
    */
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  confirmed: SecondaryIdentity[];
  /**
    * Unconfirmed identities
    */
  // @ts-ignore We allow deliberate skipping of defaults, suppress the error about this
  unconfirmed: SecondaryIdentity[];
  static readonly RTTI_CLASS: string = 'KnownIdentities';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth:KnownIdentities';
  
  constructor(data?: {/**
    * Confirmed identities
    */
  confirmed: SecondaryIdentity[], /**
    * Unconfirmed identities
    */
  unconfirmed: SecondaryIdentity[]}, skipDefaults?: boolean | undefined) {
    if (!data) {
      if (!skipDefaults) {
        this.confirmed = [];
        this.unconfirmed = [];
      }
      return;
    }
    this.confirmed = data.confirmed;
    this.unconfirmed = data.unconfirmed;
  }
  
  get RTTI_CLASS(): string {
    return KnownIdentities.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return KnownIdentities.RTTI_FQN;
  }
  
  toJSON(): KnownIdentitiesJSON {
    return KnownIdentities.toJSON(this);
  }
  
  static toJSON = (value: KnownIdentities): KnownIdentitiesJSON => {
    return {
      confirmed: value.confirmed.map((e: SecondaryIdentity) => e.toJSON()),
      unconfirmed: value.unconfirmed.map((e: SecondaryIdentity) => e.toJSON())
    };
  }
  
  static fromJSON = (value: KnownIdentitiesJSON): KnownIdentities => {
    return new KnownIdentities({
      confirmed: value.confirmed.map((e: SecondaryIdentityJSON) => SecondaryIdentity.fromJSON(e)),
      unconfirmed: value.unconfirmed.map((e: SecondaryIdentityJSON) => SecondaryIdentity.fromJSON(e))
    });
  }
  
}