import { HttpServer } from '@auth/irt-node';
import { LogLevel } from '@auth/irt';

import { AuthServiceImpl } from './auth.service';
import { UserContext } from './context';
import { AuthProtecedServiceImpl } from './auth.protected.service';
import { defaultConfig } from './config';
import { setup } from './setup';

const {
  tokens,
  logger,
  usersRepo,
  hooks
} = setup(LogLevel.Trace, defaultConfig.tokens);

// Create a new HTTP server
const server = new HttpServer<UserContext>('/api', [
    new AuthServiceImpl(logger, usersRepo, tokens, defaultConfig),
    new AuthProtecedServiceImpl(logger, usersRepo, tokens, defaultConfig)
], {
  port: 8081,
  logger,
  hooks
});

// Start the server
server.open();
