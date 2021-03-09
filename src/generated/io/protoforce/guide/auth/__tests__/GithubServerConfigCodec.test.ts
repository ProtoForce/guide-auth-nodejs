// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  GithubServerConfig
} from '../GithubServerConfig';
import {
  randomGithubServerConfig
} from '../utils/randomGithubServerConfig';

describe('io.protoforce.guide.auth:GithubServerConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomGithubServerConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => GithubServerConfig.fromJSON(json)).not.toThrow();
    const sample2 = GithubServerConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     