// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SignUp
} from '../SignUp';
import {
  randomSignUpEmail
} from './randomSignUpEmail';
import {
  randomSignUpFacebook
} from './randomSignUpFacebook';
import {
  randomSignUpGithub
} from './randomSignUpGithub';
import {
  randomSignUpGoogle
} from './randomSignUpGoogle';
import {
  randomSignUpPhone
} from './randomSignUpPhone';
import {
  randomSignUpTwitter
} from './randomSignUpTwitter';

export function randomSignUp(): SignUp {
  const r = Random.rndNumber(0, 5, true);
  switch (r) {
    case 0: return SignUp.fromEmail(randomSignUpEmail());
    case 1: return SignUp.fromPhone(randomSignUpPhone());
    case 2: return SignUp.fromGoogle(randomSignUpGoogle());
    case 3: return SignUp.fromGithub(randomSignUpGithub());
    case 4: return SignUp.fromFacebook(randomSignUpFacebook());
    case 5: return SignUp.fromTwitter(randomSignUpTwitter());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
