// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SMSConfig
} from '../SMSConfig';
import {
  randomSMSConfig
} from '../utils/randomSMSConfig';

describe('io.protoforce.guide.auth:SMSConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSMSConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SMSConfig.fromJSON(json)).not.toThrow();
    const sample2 = SMSConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     