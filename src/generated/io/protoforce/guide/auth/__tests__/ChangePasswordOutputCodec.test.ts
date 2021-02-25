// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthServiceChangePasswordOutput
} from '../authservice/models/AuthServiceChangePasswordOutput';
import {
  randomAuthServiceChangePasswordOutput
} from '../utils/authservice/models/randomAuthServiceChangePasswordOutput';

describe('io.protoforce.guide.auth.authservice.models:ChangePasswordOutput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthServiceChangePasswordOutput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthServiceChangePasswordOutput.fromJSON(json)).not.toThrow();
    const sample2 = AuthServiceChangePasswordOutput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     