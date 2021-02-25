// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthServiceSignupInput
} from '../authservice/models/AuthServiceSignupInput';
import {
  randomAuthServiceSignupInput
} from '../utils/authservice/models/randomAuthServiceSignupInput';

describe('io.protoforce.guide.auth.authservice.models:SignupInput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthServiceSignupInput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthServiceSignupInput.fromJSON(json)).not.toThrow();
    const sample2 = AuthServiceSignupInput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     