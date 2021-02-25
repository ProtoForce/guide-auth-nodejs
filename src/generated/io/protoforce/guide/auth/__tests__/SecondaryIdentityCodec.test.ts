// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SecondaryIdentity
} from '../SecondaryIdentity';
import {
  randomSecondaryIdentity
} from '../utils/randomSecondaryIdentity';

describe('io.protoforce.guide.auth:SecondaryIdentity has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSecondaryIdentity();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SecondaryIdentity.fromJSON(json)).not.toThrow();
    const sample2 = SecondaryIdentity.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     