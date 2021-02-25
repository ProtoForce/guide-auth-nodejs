// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthProtectedServiceListIdentitiesInput
} from '../authprotectedservice/models/AuthProtectedServiceListIdentitiesInput';
import {
  randomAuthProtectedServiceListIdentitiesInput
} from '../utils/authprotectedservice/models/randomAuthProtectedServiceListIdentitiesInput';

describe('io.protoforce.guide.auth.authprotectedservice.models:ListIdentitiesInput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthProtectedServiceListIdentitiesInput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthProtectedServiceListIdentitiesInput.fromJSON(json)).not.toThrow();
    const sample2 = AuthProtectedServiceListIdentitiesInput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     