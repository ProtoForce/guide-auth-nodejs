// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  NotFoundError
} from '../NotFoundError';
import {
  randomNotFoundError
} from '../utils/randomNotFoundError';

describe('io.protoforce.guide.auth:NotFoundError has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomNotFoundError();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => NotFoundError.fromJSON(json)).not.toThrow();
    const sample2 = NotFoundError.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     