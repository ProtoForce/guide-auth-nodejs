// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthServiceSigninOutput
} from '../authservice/models/AuthServiceSigninOutput';
import {
  randomAuthServiceSigninOutput
} from '../utils/authservice/models/randomAuthServiceSigninOutput';

describe('io.protoforce.guide.auth.authservice.models:SigninOutput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthServiceSigninOutput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthServiceSigninOutput.fromJSON(json)).not.toThrow();
    const sample2 = AuthServiceSigninOutput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     