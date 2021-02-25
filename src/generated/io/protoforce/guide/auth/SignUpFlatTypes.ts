// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  SignUpEmail
} from './SignUpEmail';
import {
  SignUpFacebook
} from './SignUpFacebook';
import {
  SignUpGithub
} from './SignUpGithub';
import {
  SignUpGoogle
} from './SignUpGoogle';
import {
  SignUpPhone
} from './SignUpPhone';
import {
  SignUpTwitter
} from './SignUpTwitter';

export type SignUpFlatTypes = SignUpEmail | SignUpPhone | SignUpGoogle | SignUpGithub | SignUpFacebook | SignUpTwitter;