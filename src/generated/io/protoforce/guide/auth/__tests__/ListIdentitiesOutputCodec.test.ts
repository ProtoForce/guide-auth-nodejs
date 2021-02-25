// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthProtectedServiceListIdentitiesOutput
} from '../authprotectedservice/models/AuthProtectedServiceListIdentitiesOutput';
import {
  randomAuthProtectedServiceListIdentitiesOutput
} from '../utils/authprotectedservice/models/randomAuthProtectedServiceListIdentitiesOutput';

describe('io.protoforce.guide.auth.authprotectedservice.models:ListIdentitiesOutput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthProtectedServiceListIdentitiesOutput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthProtectedServiceListIdentitiesOutput.fromJSON(json)).not.toThrow();
    const sample2 = AuthProtectedServiceListIdentitiesOutput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     