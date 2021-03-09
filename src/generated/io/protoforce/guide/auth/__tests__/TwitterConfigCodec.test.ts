// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  TwitterConfig
} from '../TwitterConfig';
import {
  randomTwitterConfig
} from '../utils/randomTwitterConfig';

describe('io.protoforce.guide.auth:TwitterConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomTwitterConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => TwitterConfig.fromJSON(json)).not.toThrow();
    const sample2 = TwitterConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     