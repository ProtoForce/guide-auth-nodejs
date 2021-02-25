// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SigninResponseConfirm2FA
} from '../SigninResponseConfirm2FA';
import {
  randomSigninResponseConfirm2FA
} from '../utils/randomSigninResponseConfirm2FA';

describe('io.protoforce.guide.auth/SigninResponse:Confirm2FA has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSigninResponseConfirm2FA();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SigninResponseConfirm2FA.fromJSON(json)).not.toThrow();
    const sample2 = SigninResponseConfirm2FA.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     