// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthServiceChangePasswordInput
} from '../authservice/models/AuthServiceChangePasswordInput';
import {
  randomAuthServiceChangePasswordInput
} from '../utils/authservice/models/randomAuthServiceChangePasswordInput';

describe('io.protoforce.guide.auth.authservice.models:ChangePasswordInput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthServiceChangePasswordInput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthServiceChangePasswordInput.fromJSON(json)).not.toThrow();
    const sample2 = AuthServiceChangePasswordInput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     