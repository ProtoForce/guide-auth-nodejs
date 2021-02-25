// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthProtectedServiceRequest2FAInput
} from '../authprotectedservice/models/AuthProtectedServiceRequest2FAInput';
import {
  randomAuthProtectedServiceRequest2FAInput
} from '../utils/authprotectedservice/models/randomAuthProtectedServiceRequest2FAInput';

describe('io.protoforce.guide.auth.authprotectedservice.models:Request2FAInput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthProtectedServiceRequest2FAInput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthProtectedServiceRequest2FAInput.fromJSON(json)).not.toThrow();
    const sample2 = AuthProtectedServiceRequest2FAInput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     