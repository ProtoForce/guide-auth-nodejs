// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthProtectedServiceDisable2FAOutput
} from '../authprotectedservice/models/AuthProtectedServiceDisable2FAOutput';
import {
  randomAuthProtectedServiceDisable2FAOutput
} from '../utils/authprotectedservice/models/randomAuthProtectedServiceDisable2FAOutput';

describe('io.protoforce.guide.auth.authprotectedservice.models:Disable2FAOutput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthProtectedServiceDisable2FAOutput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthProtectedServiceDisable2FAOutput.fromJSON(json)).not.toThrow();
    const sample2 = AuthProtectedServiceDisable2FAOutput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     