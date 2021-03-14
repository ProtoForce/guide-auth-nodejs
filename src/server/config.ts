import { ServerConfig } from '@auth/service';

import { defaultTokensConfig } from './tokens';

// Fill those in with credentials from providers
export const defaultConfig = ServerConfig.fromJSON({
    tokens: defaultTokensConfig,
    facebook: {
        appId: ''
    },
    google: {
        clientId: '',
        clientSecret: '',
        redirectUrl: ''
    },
    twitter: {
        customerId: '',
        customerSecret: ''
    },
    github: {
        clientId: '',
        clientSecret: ''
    },
    email: {
        apiKey: '',
        confirmEndpoint: 'http://localhost:3000/verify/email?token=',
        resetPassEndpoint: 'http://localhost:3000/password/reset?token='
    },
    sms: {
        apiKey: ''
    }
});
