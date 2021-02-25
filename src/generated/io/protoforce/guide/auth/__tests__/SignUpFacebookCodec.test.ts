// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SignUpFacebook
} from '../SignUpFacebook';
import {
  randomSignUpFacebook
} from '../utils/randomSignUpFacebook';

describe('io.protoforce.guide.auth/SignUp:Facebook has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSignUpFacebook();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SignUpFacebook.fromJSON(json)).not.toThrow();
    const sample2 = SignUpFacebook.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     