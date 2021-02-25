// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs

import {
  JSONWithTypeField
} from '../../../../../irt';
import {
  UserLookupEmailJSON
} from './UserLookupEmailJSON';
import {
  UserLookupPhoneJSON
} from './UserLookupPhoneJSON';


export type UserLookupJSON = JSONWithTypeField<string> | JSONWithTypeField<UserLookupEmailJSON> | JSONWithTypeField<UserLookupPhoneJSON>;