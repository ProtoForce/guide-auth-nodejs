// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthServiceSignupOutput
} from '../authservice/models/AuthServiceSignupOutput';
import {
  randomAuthServiceSignupOutput
} from '../utils/authservice/models/randomAuthServiceSignupOutput';

describe('io.protoforce.guide.auth.authservice.models:SignupOutput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthServiceSignupOutput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthServiceSignupOutput.fromJSON(json)).not.toThrow();
    const sample2 = AuthServiceSignupOutput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     