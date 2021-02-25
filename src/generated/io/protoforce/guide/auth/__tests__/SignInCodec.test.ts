// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SignIn
} from '../SignIn';
import {
  randomSignIn
} from '../utils/randomSignIn';

describe('io.protoforce.guide.auth:SignIn has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSignIn();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SignIn.fromJSON(json)).not.toThrow();
    const sample2 = SignIn.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     