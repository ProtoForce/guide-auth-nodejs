// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  User
} from '../User';
import {
  randomUser
} from '../utils/randomUser';

describe('io.protoforce.guide.auth:User has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomUser();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => User.fromJSON(json)).not.toThrow();
    const sample2 = User.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     