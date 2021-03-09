// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  ProvidersConfig
} from '../ProvidersConfig';
import {
  randomProvidersConfig
} from '../utils/randomProvidersConfig';

describe('io.protoforce.guide.auth:ProvidersConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomProvidersConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => ProvidersConfig.fromJSON(json)).not.toThrow();
    const sample2 = ProvidersConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     