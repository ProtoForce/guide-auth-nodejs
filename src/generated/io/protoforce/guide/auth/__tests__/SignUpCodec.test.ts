// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SignUp
} from '../SignUp';
import {
  randomSignUp
} from '../utils/randomSignUp';

describe('io.protoforce.guide.auth:SignUp has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSignUp();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SignUp.fromJSON(json)).not.toThrow();
    const sample2 = SignUp.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     