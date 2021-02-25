// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  GenericSuccess
} from '../GenericSuccess';
import {
  randomGenericSuccess
} from '../utils/randomGenericSuccess';

describe('io.protoforce.guide.auth:GenericSuccess has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomGenericSuccess();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => GenericSuccess.fromJSON(json)).not.toThrow();
    const sample2 = GenericSuccess.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     