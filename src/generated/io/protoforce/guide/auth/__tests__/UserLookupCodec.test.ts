// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  UserLookup
} from '../UserLookup';
import {
  randomUserLookup
} from '../utils/randomUserLookup';

describe('io.protoforce.guide.auth:UserLookup has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomUserLookup();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => UserLookup.fromJSON(json)).not.toThrow();
    const sample2 = UserLookup.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     