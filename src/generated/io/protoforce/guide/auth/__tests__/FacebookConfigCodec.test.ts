// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  FacebookConfig
} from '../FacebookConfig';
import {
  randomFacebookConfig
} from '../utils/randomFacebookConfig';

describe('io.protoforce.guide.auth:FacebookConfig has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomFacebookConfig();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => FacebookConfig.fromJSON(json)).not.toThrow();
    const sample2 = FacebookConfig.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     