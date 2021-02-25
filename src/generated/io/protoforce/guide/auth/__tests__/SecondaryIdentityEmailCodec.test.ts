// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SecondaryIdentityEmail
} from '../SecondaryIdentityEmail';
import {
  randomSecondaryIdentityEmail
} from '../utils/randomSecondaryIdentityEmail';

describe('io.protoforce.guide.auth/SecondaryIdentity:Email has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSecondaryIdentityEmail();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SecondaryIdentityEmail.fromJSON(json)).not.toThrow();
    const sample2 = SecondaryIdentityEmail.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     