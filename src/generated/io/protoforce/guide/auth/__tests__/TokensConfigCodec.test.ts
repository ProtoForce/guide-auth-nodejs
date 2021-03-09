// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  TokensConfig
} from '../TokensConfig';
import {
  randomTokensConfig
} from '../utils/randomTokensConfig';

describe('io.protoforce.guide.auth:TokensConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomTokensConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => TokensConfig.fromJSON(json)).not.toThrow();
    const sample2 = TokensConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     