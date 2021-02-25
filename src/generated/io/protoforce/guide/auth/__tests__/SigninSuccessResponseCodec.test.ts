// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SigninSuccessResponse
} from '../SigninSuccessResponse';
import {
  randomSigninSuccessResponse
} from '../utils/randomSigninSuccessResponse';

describe('io.protoforce.guide.auth:SigninSuccessResponse has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSigninSuccessResponse();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SigninSuccessResponse.fromJSON(json)).not.toThrow();
    const sample2 = SigninSuccessResponse.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     