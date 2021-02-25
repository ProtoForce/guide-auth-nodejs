// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  MFAMethodRequestApp
} from '../MFAMethodRequestApp';
import {
  randomMFAMethodRequestApp
} from '../utils/randomMFAMethodRequestApp';

describe('io.protoforce.guide.auth/MFAMethodRequest:App has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomMFAMethodRequestApp();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => MFAMethodRequestApp.fromJSON(json)).not.toThrow();
    const sample2 = MFAMethodRequestApp.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     