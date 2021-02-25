// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  TwitterAuth
} from '../TwitterAuth';
import {
  randomTwitterAuth
} from '../utils/randomTwitterAuth';

describe('io.protoforce.guide.auth:TwitterAuth has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomTwitterAuth();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => TwitterAuth.fromJSON(json)).not.toThrow();
    const sample2 = TwitterAuth.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     