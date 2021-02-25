// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SignUpPhone
} from '../SignUpPhone';
import {
  randomSignUpPhone
} from '../utils/randomSignUpPhone';

describe('io.protoforce.guide.auth/SignUp:Phone has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSignUpPhone();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SignUpPhone.fromJSON(json)).not.toThrow();
    const sample2 = SignUpPhone.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     