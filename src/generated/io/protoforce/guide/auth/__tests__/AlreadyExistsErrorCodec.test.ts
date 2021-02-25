// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  AlreadyExistsError
} from '../AlreadyExistsError';
import {
  randomAlreadyExistsError
} from '../utils/randomAlreadyExistsError';

describe('io.protoforce.guide.auth:AlreadyExistsError has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomAlreadyExistsError();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => AlreadyExistsError.fromJSON(json)).not.toThrow();
    const sample2 = AlreadyExistsError.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     