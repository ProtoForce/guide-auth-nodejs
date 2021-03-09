// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth

import {
  EmailConfig
} from './EmailConfig';
import {
  FacebookConfig
} from './FacebookConfig';
import {
  GithubConfig
} from './GithubConfig';
import {
  GoogleConfig
} from './GoogleConfig';
import {
  ProvidersConfig
} from './ProvidersConfig';
import {
  SMSConfig
} from './SMSConfig';
import {
  ServerEnvConfig
} from './ServerEnvConfig';
import {
  TokensConfig
} from './TokensConfig';
import {
  TwitterConfig
} from './TwitterConfig';

export class ServerConfigs {
  /**
    * Defined at config.pfm @ 52:5
    */
  static readonly local: ServerEnvConfig = new ServerEnvConfig({
    tokens: new TokensConfig({
      jwtKey: '2978f.g278gf,?h24937fg3##o847hfg',
      expiration: 3600
    }),
    email: new EmailConfig({
      apiKey: '',
      confirmEndpoint: 'http://localhost:3000/verify/email?token=',
      resetPassEndpoint: 'http://localhost:3000/password/reset?token='
    }),
    sms: new SMSConfig({
      apiKey: ''
    }),
    providers: new ProvidersConfig({
      facebook: new FacebookConfig({
        appId: ''
      }),
      google: new GoogleConfig({
        clientId: '',
        clientSecret: '',
        redirectUrl: ''
      }),
      twitter: new TwitterConfig({
        customerId: '',
        customerSecret: ''
      }),
      github: new GithubConfig({
        clientId: '',
        clientSecret: ''
      })
    })
  });
}