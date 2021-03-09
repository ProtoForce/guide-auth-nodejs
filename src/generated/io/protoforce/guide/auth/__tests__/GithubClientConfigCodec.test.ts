// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  GithubClientConfig
} from '../GithubClientConfig';
import {
  randomGithubClientConfig
} from '../utils/randomGithubClientConfig';

describe('io.protoforce.guide.auth:GithubClientConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomGithubClientConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => GithubClientConfig.fromJSON(json)).not.toThrow();
    const sample2 = GithubClientConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     