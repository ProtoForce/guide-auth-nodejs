// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  TokensServerConfig
} from '../TokensServerConfig';
import {
  randomTokensServerConfig
} from '../utils/randomTokensServerConfig';

describe('io.protoforce.guide.auth:TokensServerConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomTokensServerConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => TokensServerConfig.fromJSON(json)).not.toThrow();
    const sample2 = TokensServerConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     