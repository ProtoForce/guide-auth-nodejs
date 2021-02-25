// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SigninResponse
} from '../SigninResponse';
import {
  randomSigninResponse
} from '../utils/randomSigninResponse';

describe('io.protoforce.guide.auth:SigninResponse has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSigninResponse();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SigninResponse.fromJSON(json)).not.toThrow();
    const sample2 = SigninResponse.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     