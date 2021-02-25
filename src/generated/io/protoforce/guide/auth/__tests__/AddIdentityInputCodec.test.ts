// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthProtectedServiceAddIdentityInput
} from '../authprotectedservice/models/AuthProtectedServiceAddIdentityInput';
import {
  randomAuthProtectedServiceAddIdentityInput
} from '../utils/authprotectedservice/models/randomAuthProtectedServiceAddIdentityInput';

describe('io.protoforce.guide.auth.authprotectedservice.models:AddIdentityInput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthProtectedServiceAddIdentityInput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthProtectedServiceAddIdentityInput.fromJSON(json)).not.toThrow();
    const sample2 = AuthProtectedServiceAddIdentityInput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     