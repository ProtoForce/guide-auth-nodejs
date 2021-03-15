// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  ClientConfig
} from './ClientConfig';
import {
  FacebookConfig
} from './FacebookConfig';
import {
  GithubClientConfig
} from './GithubClientConfig';
import {
  GoogleClientConfig
} from './GoogleClientConfig';
import {
  TwitterClientConfig
} from './TwitterClientConfig';

export class ClientConfigs {
  /**
    * Defined at config.pfm @ 67:5
    */
  static readonly local: ClientConfig = new ClientConfig({
    github: new GithubClientConfig({
      clientId: ''
    }),
    google: new GoogleClientConfig({
      clientId: '',
      redirectUrl: ''
    }),
    facebook: new FacebookConfig({
      appId: ''
    }),
    endpoint: 'http://localhost:8081/api',
    twitter: new TwitterClientConfig({
      customerId: ''
    })
  });
}