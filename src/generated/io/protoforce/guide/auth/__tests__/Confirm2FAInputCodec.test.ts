// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthProtectedServiceConfirm2FAInput
} from '../authprotectedservice/models/AuthProtectedServiceConfirm2FAInput';
import {
  randomAuthProtectedServiceConfirm2FAInput
} from '../utils/authprotectedservice/models/randomAuthProtectedServiceConfirm2FAInput';

describe('io.protoforce.guide.auth.authprotectedservice.models:Confirm2FAInput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthProtectedServiceConfirm2FAInput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthProtectedServiceConfirm2FAInput.fromJSON(json)).not.toThrow();
    const sample2 = AuthProtectedServiceConfirm2FAInput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     