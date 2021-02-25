// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  SignupAttributesCodec
} from '../codecs/SignupAttributesCodec';
import {
  SignupAttributesImpl
} from '../SignupAttributesImpl';
import {
  randomSignupAttributesImpl
} from '../utils/randomSignupAttributesImpl';

describe('io.protoforce.guide.auth:SignupAttributes has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomSignupAttributesImpl();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => SignupAttributesImpl.fromJSON(json)).not.toThrow();
    const sample2 = SignupAttributesImpl.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
  it('Can consistently serialize JSON as an interface', () => {
    const sample = randomSignupAttributesImpl();
    expect(() => SignupAttributesCodec.toJSON(sample)).not.toThrow();
    const json = SignupAttributesCodec.toJSON(sample);
    expect(() => SignupAttributesCodec.fromJSON(json)).not.toThrow();
    const sample2 = SignupAttributesCodec.fromJSON(json);
    const json2 = SignupAttributesCodec.toJSON(sample2);
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     