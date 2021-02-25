// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  MFAMethodConfirmApp
} from '../MFAMethodConfirmApp';
import {
  randomMFAMethodConfirmApp
} from '../utils/randomMFAMethodConfirmApp';

describe('io.protoforce.guide.auth/MFAMethodConfirm:App has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomMFAMethodConfirmApp();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => MFAMethodConfirmApp.fromJSON(json)).not.toThrow();
    const sample2 = MFAMethodConfirmApp.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     