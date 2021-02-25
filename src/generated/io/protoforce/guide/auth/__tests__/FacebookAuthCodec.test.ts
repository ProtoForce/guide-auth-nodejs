// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  FacebookAuth
} from '../FacebookAuth';
import {
  randomFacebookAuth
} from '../utils/randomFacebookAuth';

describe('io.protoforce.guide.auth:FacebookAuth has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomFacebookAuth();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => FacebookAuth.fromJSON(json)).not.toThrow();
    const sample2 = FacebookAuth.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     