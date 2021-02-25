// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SignUpGoogle
} from '../SignUpGoogle';
import {
  randomSignUpGoogle
} from '../utils/randomSignUpGoogle';

describe('io.protoforce.guide.auth/SignUp:Google has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSignUpGoogle();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SignUpGoogle.fromJSON(json)).not.toThrow();
    const sample2 = SignUpGoogle.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     