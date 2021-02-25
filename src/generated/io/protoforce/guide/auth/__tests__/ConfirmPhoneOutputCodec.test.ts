// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AuthServiceConfirmPhoneOutput
} from '../authservice/models/AuthServiceConfirmPhoneOutput';
import {
  randomAuthServiceConfirmPhoneOutput
} from '../utils/authservice/models/randomAuthServiceConfirmPhoneOutput';

describe('io.protoforce.guide.auth.authservice.models:ConfirmPhoneOutput has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAuthServiceConfirmPhoneOutput();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AuthServiceConfirmPhoneOutput.fromJSON(json)).not.toThrow();
    const sample2 = AuthServiceConfirmPhoneOutput.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     