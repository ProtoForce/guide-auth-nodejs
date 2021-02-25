// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthProtectedServiceRemoveIdentityOutput
} from '../authprotectedservice/models/AuthProtectedServiceRemoveIdentityOutput';
import {
  randomAuthProtectedServiceRemoveIdentityOutput
} from '../utils/authprotectedservice/models/randomAuthProtectedServiceRemoveIdentityOutput';

describe('io.protoforce.guide.auth.authprotectedservice.models:RemoveIdentityOutput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthProtectedServiceRemoveIdentityOutput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthProtectedServiceRemoveIdentityOutput.fromJSON(json)).not.toThrow();
    const sample2 = AuthProtectedServiceRemoveIdentityOutput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     