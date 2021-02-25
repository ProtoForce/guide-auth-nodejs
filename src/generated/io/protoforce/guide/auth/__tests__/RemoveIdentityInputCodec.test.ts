// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthProtectedServiceRemoveIdentityInput
} from '../authprotectedservice/models/AuthProtectedServiceRemoveIdentityInput';
import {
  randomAuthProtectedServiceRemoveIdentityInput
} from '../utils/authprotectedservice/models/randomAuthProtectedServiceRemoveIdentityInput';

describe('io.protoforce.guide.auth.authprotectedservice.models:RemoveIdentityInput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthProtectedServiceRemoveIdentityInput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthProtectedServiceRemoveIdentityInput.fromJSON(json)).not.toThrow();
    const sample2 = AuthProtectedServiceRemoveIdentityInput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     