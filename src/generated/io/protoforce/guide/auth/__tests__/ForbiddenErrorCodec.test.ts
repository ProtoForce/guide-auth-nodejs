// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  ForbiddenError
} from '../ForbiddenError';
import {
  randomForbiddenError
} from '../utils/randomForbiddenError';

describe('io.protoforce.guide.auth:ForbiddenError has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomForbiddenError();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => ForbiddenError.fromJSON(json)).not.toThrow();
    const sample2 = ForbiddenError.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     