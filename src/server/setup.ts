import { TokensServerConfig } from '@auth/service';
import { LogLevel, ConsoleLogger, AuthToken } from '@auth/irt';
import { HTTPServerHooks, HTTPServerTransportContext } from '@auth/irt-node';

import { createTokens } from './tokens';
import { UsersRepoMemory } from './users.repo';
import { UserContext } from './context';

// Helper function which pre-creates all necessaary entities for the server
export function setup(
    logLevel: LogLevel,
    tokensConfig: TokensServerConfig
) {
    const logger = new ConsoleLogger(logLevel);
    const tokens = createTokens(tokensConfig);
    const usersRepo = new UsersRepoMemory(logger);
    // Here we define a hook which will be called at each request, doing some
    // preparation work before it actually hits a method handler. Specifically,
    // here we check for authorization data and check its integrity.
    const hooks: HTTPServerHooks<UserContext, HTTPServerTransportContext>[] = [ 
        {
            onRequest: async data => {
                try {
                    // Setup user context
                    data.context.user = {};
                    const transportContext = data.context.system;
                    // Let's see if a user has provided an auth token, this way we can pre-fill user context
                    // with data before it hits the handler
                    let token = transportContext.auth.method instanceof AuthToken ?
                      transportContext.auth.method.token : undefined;
                    if (!token) {
                      // Alternatively, if a user has a cookie present, we could grab it here like this:
                      // Check if we have an auth set on the cookie instead:
                      const cookies = transportContext.transport.request.headers['set-cookie'];
                      const authCookie = cookies?.find(c => c.trim().startsWith('auth-token='));
                      if (authCookie) {
                          // This is a primitive way to parse it, in reality there might be expiration and other
                          // details set on the cookie, so it would be preferred to use a special lib to parse it
                          // in a reliable way
                          token = authCookie.substr(11);
                      }
                    }
                    if (!token) {
                        // No authorization present, just continue processing
                        return true;
                    }
                    // Validate the token and get the user ID
                    data.context.user.userID = tokens.parseAuthToken(token);
                    return true;   
                } catch (err) {
                    logger.logf(LogLevel.Error, err);
                    return true;
                }
            }
        }
    ];
    return {
        logger,
        tokens,
        hooks,
        usersRepo
    };
}
