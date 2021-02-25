// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  UserLookupEmail
} from '../UserLookupEmail';
import {
  randomUserLookupEmail
} from '../utils/randomUserLookupEmail';

describe('io.protoforce.guide.auth/UserLookup:Email has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomUserLookupEmail();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => UserLookupEmail.fromJSON(json)).not.toThrow();
    const sample2 = UserLookupEmail.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     