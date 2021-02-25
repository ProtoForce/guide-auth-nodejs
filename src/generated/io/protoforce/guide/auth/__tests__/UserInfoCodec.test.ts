// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.__tests__

import {
  UserInfoCodec
} from '../codecs/UserInfoCodec';
import {
  UserInfoImpl
} from '../UserInfoImpl';
import {
  randomUserInfoImpl
} from '../utils/randomUserInfoImpl';

describe('io.protoforce.guide.auth:UserInfo has working codec', () => {

  it('Can consistently serialize to and from JSON', () => {
    const sample = randomUserInfoImpl();
    expect(() => sample.toJSON()).not.toThrow();
    const json = sample.toJSON();
    expect(() => UserInfoImpl.fromJSON(json)).not.toThrow();
    const sample2 = UserInfoImpl.fromJSON(json);
    const json2 = sample2.toJSON();
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
  it('Can consistently serialize JSON as an interface', () => {
    const sample = randomUserInfoImpl();
    expect(() => UserInfoCodec.toJSON(sample)).not.toThrow();
    const json = UserInfoCodec.toJSON(sample);
    expect(() => UserInfoCodec.fromJSON(json)).not.toThrow();
    const sample2 = UserInfoCodec.fromJSON(json);
    const json2 = UserInfoCodec.toJSON(sample2);
    expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
  });
         
})
     