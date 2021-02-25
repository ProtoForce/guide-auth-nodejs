// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  MFAMethodPendingApp
} from '../MFAMethodPendingApp';
import {
  randomMFAMethodPendingApp
} from '../utils/randomMFAMethodPendingApp';

describe('io.protoforce.guide.auth/MFAMethodPending:App has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomMFAMethodPendingApp();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => MFAMethodPendingApp.fromJSON(json)).not.toThrow();
    const sample2 = MFAMethodPendingApp.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     