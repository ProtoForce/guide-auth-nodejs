// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  TwitterServerConfig
} from '../TwitterServerConfig';
import {
  randomTwitterServerConfig
} from '../utils/randomTwitterServerConfig';

describe('io.protoforce.guide.auth:TwitterServerConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomTwitterServerConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => TwitterServerConfig.fromJSON(json)).not.toThrow();
    const sample2 = TwitterServerConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     