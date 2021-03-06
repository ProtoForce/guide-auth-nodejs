// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SMSServerConfig
} from '../SMSServerConfig';
import {
  randomSMSServerConfig
} from '../utils/randomSMSServerConfig';

describe('io.protoforce.guide.auth:SMSServerConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSMSServerConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SMSServerConfig.fromJSON(json)).not.toThrow();
    const sample2 = SMSServerConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     