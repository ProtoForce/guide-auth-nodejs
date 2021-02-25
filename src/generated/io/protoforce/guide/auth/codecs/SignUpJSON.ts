// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.codecs

import {
  JSONWithTypeField
} from '../../../../../irt';
import {
  SignUpEmailJSON
} from './SignUpEmailJSON';
import {
  SignUpFacebookJSON
} from './SignUpFacebookJSON';
import {
  SignUpGithubJSON
} from './SignUpGithubJSON';
import {
  SignUpGoogleJSON
} from './SignUpGoogleJSON';
import {
  SignUpPhoneJSON
} from './SignUpPhoneJSON';
import {
  SignUpTwitterJSON
} from './SignUpTwitterJSON';


export type SignUpJSON = JSONWithTypeField<SignUpEmailJSON> | JSONWithTypeField<SignUpPhoneJSON> | JSONWithTypeField<SignUpGoogleJSON> | JSONWithTypeField<SignUpGithubJSON> | JSONWithTypeField<SignUpFacebookJSON> | JSONWithTypeField<SignUpTwitterJSON>;