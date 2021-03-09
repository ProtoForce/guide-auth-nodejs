// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  TwitterClientConfig
} from '../TwitterClientConfig';
import {
  randomTwitterClientConfig
} from '../utils/randomTwitterClientConfig';

describe('io.protoforce.guide.auth:TwitterClientConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomTwitterClientConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => TwitterClientConfig.fromJSON(json)).not.toThrow();
    const sample2 = TwitterClientConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     