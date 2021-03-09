// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  ServerEnvConfig
} from '../ServerEnvConfig';
import {
  randomServerEnvConfig
} from '../utils/randomServerEnvConfig';

describe('io.protoforce.guide.auth:ServerEnvConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomServerEnvConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => ServerEnvConfig.fromJSON(json)).not.toThrow();
    const sample2 = ServerEnvConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     