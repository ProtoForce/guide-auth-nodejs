// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  UserLookupPhone
} from '../UserLookupPhone';
import {
  randomUserLookupPhone
} from '../utils/randomUserLookupPhone';

describe('io.protoforce.guide.auth/UserLookup:Phone has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomUserLookupPhone();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => UserLookupPhone.fromJSON(json)).not.toThrow();
    const sample2 = UserLookupPhone.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     