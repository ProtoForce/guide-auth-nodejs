// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  PhonePass
} from '../PhonePass';
import {
  randomPhonePass
} from '../utils/randomPhonePass';

describe('io.protoforce.guide.auth:PhonePass has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomPhonePass();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => PhonePass.fromJSON(json)).not.toThrow();
    const sample2 = PhonePass.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     