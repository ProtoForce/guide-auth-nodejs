// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthProtectedServiceConfirm2FAOutput
} from '../authprotectedservice/models/AuthProtectedServiceConfirm2FAOutput';
import {
  randomAuthProtectedServiceConfirm2FAOutput
} from '../utils/authprotectedservice/models/randomAuthProtectedServiceConfirm2FAOutput';

describe('io.protoforce.guide.auth.authprotectedservice.models:Confirm2FAOutput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthProtectedServiceConfirm2FAOutput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthProtectedServiceConfirm2FAOutput.fromJSON(json)).not.toThrow();
    const sample2 = AuthProtectedServiceConfirm2FAOutput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     