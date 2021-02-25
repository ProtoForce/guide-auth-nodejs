// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.utils

import {
  Random
} from '../../../../../irt';
import {
  SignIn
} from '../SignIn';
import {
  randomEmailPass
} from './randomEmailPass';
import {
  randomFacebookAuth
} from './randomFacebookAuth';
import {
  randomGithubAuth
} from './randomGithubAuth';
import {
  randomGoogleAuth
} from './randomGoogleAuth';
import {
  randomPhonePass
} from './randomPhonePass';
import {
  randomSignInTwoFactor
} from './randomSignInTwoFactor';
import {
  randomTwitterAuth
} from './randomTwitterAuth';

export function randomSignIn(): SignIn {
  const r = Random.rndNumber(0, 6, true);
  switch (r) {
    case 0: return SignIn.fromEmailPass(randomEmailPass());
    case 1: return SignIn.fromPhonePass(randomPhonePass());
    case 2: return SignIn.fromGoogleAuth(randomGoogleAuth());
    case 3: return SignIn.fromGithubAuth(randomGithubAuth());
    case 4: return SignIn.fromFacebookAuth(randomFacebookAuth());
    case 5: return SignIn.fromTwitterAuth(randomTwitterAuth());
    case 6: return SignIn.fromTwoFactor(randomSignInTwoFactor());
    default: throw new Error("Random.rndNumber returned unexpected value " + r);
  }
}
