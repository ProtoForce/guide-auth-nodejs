// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SecondaryIdentityPhone
} from '../SecondaryIdentityPhone';
import {
  randomSecondaryIdentityPhone
} from '../utils/randomSecondaryIdentityPhone';

describe('io.protoforce.guide.auth/SecondaryIdentity:Phone has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSecondaryIdentityPhone();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SecondaryIdentityPhone.fromJSON(json)).not.toThrow();
    const sample2 = SecondaryIdentityPhone.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     