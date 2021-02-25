// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  MFAMethodPending
} from '../MFAMethodPending';
import {
  randomMFAMethodPending
} from '../utils/randomMFAMethodPending';

describe('io.protoforce.guide.auth:MFAMethodPending has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomMFAMethodPending();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => MFAMethodPending.fromJSON(json)).not.toThrow();
    const sample2 = MFAMethodPending.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     