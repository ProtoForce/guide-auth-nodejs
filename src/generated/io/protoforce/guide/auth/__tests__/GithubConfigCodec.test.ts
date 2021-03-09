// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  GithubConfig
} from '../GithubConfig';
import {
  randomGithubConfig
} from '../utils/randomGithubConfig';

describe('io.protoforce.guide.auth:GithubConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomGithubConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => GithubConfig.fromJSON(json)).not.toThrow();
    const sample2 = GithubConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     