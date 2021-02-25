// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthProtectedServiceRequest2FAOutput
} from '../authprotectedservice/models/AuthProtectedServiceRequest2FAOutput';
import {
  randomAuthProtectedServiceRequest2FAOutput
} from '../utils/authprotectedservice/models/randomAuthProtectedServiceRequest2FAOutput';

describe('io.protoforce.guide.auth.authprotectedservice.models:Request2FAOutput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthProtectedServiceRequest2FAOutput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthProtectedServiceRequest2FAOutput.fromJSON(json)).not.toThrow();
    const sample2 = AuthProtectedServiceRequest2FAOutput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     