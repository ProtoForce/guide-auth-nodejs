// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthServiceConfirmEmailInput
} from '../authservice/models/AuthServiceConfirmEmailInput';
import {
  randomAuthServiceConfirmEmailInput
} from '../utils/authservice/models/randomAuthServiceConfirmEmailInput';

describe('io.protoforce.guide.auth.authservice.models:ConfirmEmailInput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthServiceConfirmEmailInput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthServiceConfirmEmailInput.fromJSON(json)).not.toThrow();
    const sample2 = AuthServiceConfirmEmailInput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     