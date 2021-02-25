// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SignUpEmail
} from '../SignUpEmail';
import {
  randomSignUpEmail
} from '../utils/randomSignUpEmail';

describe('io.protoforce.guide.auth/SignUp:Email has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSignUpEmail();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SignUpEmail.fromJSON(json)).not.toThrow();
    const sample2 = SignUpEmail.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     