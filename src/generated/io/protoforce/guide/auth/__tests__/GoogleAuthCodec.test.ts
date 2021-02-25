// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  GoogleAuth
} from '../GoogleAuth';
import {
  randomGoogleAuth
} from '../utils/randomGoogleAuth';

describe('io.protoforce.guide.auth:GoogleAuth has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomGoogleAuth();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => GoogleAuth.fromJSON(json)).not.toThrow();
    const sample2 = GoogleAuth.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     