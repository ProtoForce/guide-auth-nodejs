// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  KnownIdentities
} from '../KnownIdentities';
import {
  randomKnownIdentities
} from '../utils/randomKnownIdentities';

describe('io.protoforce.guide.auth:KnownIdentities has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomKnownIdentities();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => KnownIdentities.fromJSON(json)).not.toThrow();
    const sample2 = KnownIdentities.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     