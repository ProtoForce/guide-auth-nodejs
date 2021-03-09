// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  GoogleConfig
} from '../GoogleConfig';
import {
  randomGoogleConfig
} from '../utils/randomGoogleConfig';

describe('io.protoforce.guide.auth:GoogleConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomGoogleConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => GoogleConfig.fromJSON(json)).not.toThrow();
    const sample2 = GoogleConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     