// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SignUpTwitter
} from '../SignUpTwitter';
import {
  randomSignUpTwitter
} from '../utils/randomSignUpTwitter';

describe('io.protoforce.guide.auth/SignUp:Twitter has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSignUpTwitter();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SignUpTwitter.fromJSON(json)).not.toThrow();
    const sample2 = SignUpTwitter.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     