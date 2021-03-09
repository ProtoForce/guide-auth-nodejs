// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  EmailConfig
} from '../EmailConfig';
import {
  randomEmailConfig
} from '../utils/randomEmailConfig';

describe('io.protoforce.guide.auth:EmailConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomEmailConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => EmailConfig.fromJSON(json)).not.toThrow();
    const sample2 = EmailConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     