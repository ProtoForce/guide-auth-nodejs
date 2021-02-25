// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthServiceConfirmPhoneInput
} from '../authservice/models/AuthServiceConfirmPhoneInput';
import {
  randomAuthServiceConfirmPhoneInput
} from '../utils/authservice/models/randomAuthServiceConfirmPhoneInput';

describe('io.protoforce.guide.auth.authservice.models:ConfirmPhoneInput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthServiceConfirmPhoneInput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthServiceConfirmPhoneInput.fromJSON(json)).not.toThrow();
    const sample2 = AuthServiceConfirmPhoneInput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     