// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  MFAMethodRequest
} from '../MFAMethodRequest';
import {
  randomMFAMethodRequest
} from '../utils/randomMFAMethodRequest';

describe('io.protoforce.guide.auth:MFAMethodRequest has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomMFAMethodRequest();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => MFAMethodRequest.fromJSON(json)).not.toThrow();
    const sample2 = MFAMethodRequest.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     