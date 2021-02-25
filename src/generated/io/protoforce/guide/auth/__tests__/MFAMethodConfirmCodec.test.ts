// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  MFAMethodConfirm
} from '../MFAMethodConfirm';
import {
  randomMFAMethodConfirm
} from '../utils/randomMFAMethodConfirm';

describe('io.protoforce.guide.auth:MFAMethodConfirm has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomMFAMethodConfirm();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => MFAMethodConfirm.fromJSON(json)).not.toThrow();
    const sample2 = MFAMethodConfirm.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     