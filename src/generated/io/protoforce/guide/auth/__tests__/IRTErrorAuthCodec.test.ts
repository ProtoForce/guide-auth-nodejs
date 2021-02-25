// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  IRTErrorAuth
} from '../IRTErrorAuth';
import {
  randomIRTErrorAuth
} from '../utils/randomIRTErrorAuth';

describe('io.protoforce.guide.auth:IRTErrorAuth has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomIRTErrorAuth();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => IRTErrorAuth.fromJSON(json)).not.toThrow();
    const sample2 = IRTErrorAuth.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     