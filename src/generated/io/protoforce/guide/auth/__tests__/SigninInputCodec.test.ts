// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthServiceSigninInput
} from '../authservice/models/AuthServiceSigninInput';
import {
  randomAuthServiceSigninInput
} from '../utils/authservice/models/randomAuthServiceSigninInput';

describe('io.protoforce.guide.auth.authservice.models:SigninInput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthServiceSigninInput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthServiceSigninInput.fromJSON(json)).not.toThrow();
    const sample2 = AuthServiceSigninInput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     