// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  GoogleClientConfig
} from '../GoogleClientConfig';
import {
  randomGoogleClientConfig
} from '../utils/randomGoogleClientConfig';

describe('io.protoforce.guide.auth:GoogleClientConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomGoogleClientConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => GoogleClientConfig.fromJSON(json)).not.toThrow();
    const sample2 = GoogleClientConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     