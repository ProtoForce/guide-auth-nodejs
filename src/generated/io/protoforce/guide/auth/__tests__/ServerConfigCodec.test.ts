// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  ServerConfig
} from '../ServerConfig';
import {
  randomServerConfig
} from '../utils/randomServerConfig';

describe('io.protoforce.guide.auth:ServerConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomServerConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => ServerConfig.fromJSON(json)).not.toThrow();
    const sample2 = ServerConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     