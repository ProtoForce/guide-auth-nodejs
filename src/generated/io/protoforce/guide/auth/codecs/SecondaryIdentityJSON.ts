// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs

import {
  JSONWithTypeNested
} from '../../../../../irt';
import {
  SecondaryIdentityEmailJSON
} from './SecondaryIdentityEmailJSON';
import {
  SecondaryIdentityPhoneJSON
} from './SecondaryIdentityPhoneJSON';


export type SecondaryIdentityJSON = JSONWithTypeNested<SecondaryIdentityPhoneJSON | SecondaryIdentityEmailJSON>;