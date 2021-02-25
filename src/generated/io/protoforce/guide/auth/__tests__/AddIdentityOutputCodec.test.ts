// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthProtectedServiceAddIdentityOutput
} from '../authprotectedservice/models/AuthProtectedServiceAddIdentityOutput';
import {
  randomAuthProtectedServiceAddIdentityOutput
} from '../utils/authprotectedservice/models/randomAuthProtectedServiceAddIdentityOutput';

describe('io.protoforce.guide.auth.authprotectedservice.models:AddIdentityOutput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthProtectedServiceAddIdentityOutput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthProtectedServiceAddIdentityOutput.fromJSON(json)).not.toThrow();
    const sample2 = AuthProtectedServiceAddIdentityOutput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     