// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthServiceConfirmEmailOutput
} from '../authservice/models/AuthServiceConfirmEmailOutput';
import {
  randomAuthServiceConfirmEmailOutput
} from '../utils/authservice/models/randomAuthServiceConfirmEmailOutput';

describe('io.protoforce.guide.auth.authservice.models:ConfirmEmailOutput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthServiceConfirmEmailOutput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthServiceConfirmEmailOutput.fromJSON(json)).not.toThrow();
    const sample2 = AuthServiceConfirmEmailOutput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     