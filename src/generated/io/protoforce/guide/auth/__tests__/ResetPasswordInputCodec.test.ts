// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthServiceResetPasswordInput
} from '../authservice/models/AuthServiceResetPasswordInput';
import {
  randomAuthServiceResetPasswordInput
} from '../utils/authservice/models/randomAuthServiceResetPasswordInput';

describe('io.protoforce.guide.auth.authservice.models:ResetPasswordInput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthServiceResetPasswordInput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthServiceResetPasswordInput.fromJSON(json)).not.toThrow();
    const sample2 = AuthServiceResetPasswordInput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     