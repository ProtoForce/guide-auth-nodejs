// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  EmailServerConfig
} from '../EmailServerConfig';
import {
  randomEmailServerConfig
} from '../utils/randomEmailServerConfig';

describe('io.protoforce.guide.auth:EmailServerConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomEmailServerConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => EmailServerConfig.fromJSON(json)).not.toThrow();
    const sample2 = EmailServerConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     