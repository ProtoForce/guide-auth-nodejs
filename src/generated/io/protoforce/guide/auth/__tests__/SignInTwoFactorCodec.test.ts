// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SignInTwoFactor
} from '../SignInTwoFactor';
import {
  randomSignInTwoFactor
} from '../utils/randomSignInTwoFactor';

describe('io.protoforce.guide.auth/SignIn:TwoFactor has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSignInTwoFactor();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SignInTwoFactor.fromJSON(json)).not.toThrow();
    const sample2 = SignInTwoFactor.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     