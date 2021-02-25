// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  UserID
} from '../UserID';
import {
  randomUserID
} from '../utils/randomUserID';

describe('io.protoforce.guide.auth:UserID has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomUserID();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => UserID.fromJSON(json)).not.toThrow();
    const sample2 = UserID.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     