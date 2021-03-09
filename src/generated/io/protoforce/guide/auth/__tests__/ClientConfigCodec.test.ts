// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  ClientConfig
} from '../ClientConfig';
import {
  randomClientConfig
} from '../utils/randomClientConfig';

describe('io.protoforce.guide.auth:ClientConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomClientConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => ClientConfig.fromJSON(json)).not.toThrow();
    const sample2 = ClientConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     