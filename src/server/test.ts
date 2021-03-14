import { ClientConfig, ClientConfigs, AuthServiceClient } from '@auth/service';
import { HTTPClientTransport, Random, LogLevel } from '@auth/irt';
import { doNodeHTTPRequest, HttpServer } from '@auth/irt-node';

import { UserContext } from './context';
import { setup } from './setup';
import { defaultTokensConfig } from './tokens';
import { AuthServiceImpl } from './auth.service';
import { defaultConfig } from './config';

// Helper to create test boilerplate, creates a server at a random port, precreates
// clients which can be used, etc.
export function createTestBoilerplate() {
    // Prepare a server side configuration
    const {
        logger,
        usersRepo,
        tokens,
        hooks
    } = setup(LogLevel.Trace, defaultTokensConfig);

    // Randomly generate a port for the test, so that we can run tests
    // in parallel
    // Just take 32K ports and shift by 10K so we randomly pick within 10K and 42K
    let port = 10000 + Math.floor(Random.nextU16() * 0.5);

    // Create clients which are needed to run tests
    const clientConfig = ClientConfig.fromJSON(ClientConfigs.local.toJSON());
    // Repoint the client config to a new port locally
    clientConfig.endpoint = 'http://localhost:' + port + '/api';
    // Since we run in NodeJS environment, XMLHttpRequest and fetch are not accessible,
    // we'll tell it to use the node http request
    const clientTransport = new HTTPClientTransport(clientConfig.endpoint, {
        requestFunction: doNodeHTTPRequest
    });
    // Now use transport to create clients
    const authClient = new AuthServiceClient(clientTransport);

    const server = new HttpServer<UserContext>('/api', [
        // @ts-ignore TS doesn't see a base class $dispatcher method here for some reasons
        new AuthServiceImpl(logger, usersRepo, tokens, defaultConfig),
    ], {
        port,
        logger,
        hooks
    });
    server.open();

    return {
        logger,
        port,
        client: {
            config: clientConfig,
            transport: clientTransport,
            auth: authClient
        },
        server: {
            stop: () => {
                server.getServer().removeAllListeners();
                server.getServer().close();
            },
            usersRepo
        }
    };
}
