// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  GithubAuth
} from '../GithubAuth';
import {
  randomGithubAuth
} from '../utils/randomGithubAuth';

describe('io.protoforce.guide.auth:GithubAuth has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomGithubAuth();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => GithubAuth.fromJSON(json)).not.toThrow();
    const sample2 = GithubAuth.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     