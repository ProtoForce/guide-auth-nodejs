// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  OAuthDataCodec
} from '../codecs/OAuthDataCodec';
import {
  OAuthDataImpl
} from '../OAuthDataImpl';
import {
  randomOAuthDataImpl
} from '../utils/randomOAuthDataImpl';

describe('io.protoforce.guide.auth:OAuthData has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomOAuthDataImpl();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => OAuthDataImpl.fromJSON(json)).not.toThrow();
    const sample2 = OAuthDataImpl.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
  it('Can consistently serialize JSON as an interface', () => {
    const sample = randomOAuthDataImpl();
    expect(() => OAuthDataCodec.toJSON(sample)).not.toThrow();
    const json = OAuthDataCodec.toJSON(sample);
    expect(() => OAuthDataCodec.fromJSON(json)).not.toThrow();
    const sample2 = OAuthDataCodec.fromJSON(json);
    const json2 = OAuthDataCodec.toJSON(sample2);
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     