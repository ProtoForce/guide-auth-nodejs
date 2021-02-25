// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  InternalError
} from '../InternalError';
import {
  randomInternalError
} from '../utils/randomInternalError';

describe('io.protoforce.guide.auth:InternalError has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomInternalError();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => InternalError.fromJSON(json)).not.toThrow();
    const sample2 = InternalError.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     