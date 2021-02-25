// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  EmailPass
} from '../EmailPass';
import {
  randomEmailPass
} from '../utils/randomEmailPass';

describe('io.protoforce.guide.auth:EmailPass has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomEmailPass();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => EmailPass.fromJSON(json)).not.toThrow();
    const sample2 = EmailPass.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     