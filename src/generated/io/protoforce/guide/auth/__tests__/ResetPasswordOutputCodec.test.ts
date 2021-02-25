// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthServiceResetPasswordOutput
} from '../authservice/models/AuthServiceResetPasswordOutput';
import {
  randomAuthServiceResetPasswordOutput
} from '../utils/authservice/models/randomAuthServiceResetPasswordOutput';

describe('io.protoforce.guide.auth.authservice.models:ResetPasswordOutput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthServiceResetPasswordOutput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthServiceResetPasswordOutput.fromJSON(json)).not.toThrow();
    const sample2 = AuthServiceResetPasswordOutput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     