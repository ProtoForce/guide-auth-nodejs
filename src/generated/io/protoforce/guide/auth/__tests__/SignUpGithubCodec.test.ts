// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SignUpGithub
} from '../SignUpGithub';
import {
  randomSignUpGithub
} from '../utils/randomSignUpGithub';

describe('io.protoforce.guide.auth/SignUp:Github has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSignUpGithub();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SignUpGithub.fromJSON(json)).not.toThrow();
    const sample2 = SignUpGithub.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     