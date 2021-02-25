
import { HTTPMethod } from '../http';

/** Options to configure behavior of the HTTP server
 *  @allowOrigin    // Default '*'
 *  @allowMethods   // Default 'GET, POST, PUT, PATCH, DELETE, OPTION'
 *  @maxAge         // Default 24 hours - '86400'
 *  @allowHeaders   // Default 'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, X-Forwarded-For'
 */
export interface HTTPServerCORSOptions {
    allowOrigin: string;
    allowMethods: HTTPMethod[];
    maxAge: string;
    allowHeaders: string[];
    exposeHeaders: string[];
}

/**
 * Default HTTP server CORS options
 */
export const defaultHTTPServerCorsOptions: HTTPServerCORSOptions = {
    allowOrigin: '*',
    allowMethods: [
        HTTPMethod.GET,
        HTTPMethod.POST,
        HTTPMethod.PUT,
        HTTPMethod.DELETE,
        HTTPMethod.PATCH,
        HTTPMethod.OPTIONS
    ],
    maxAge: '86400',
    allowHeaders: [
        'Origin',
        'X-Requested-With',
        'X-HTTP-Method-Override',
        'Content-Type',
        'Accept',
        'Authorization',
        'X-Forwarded-For'
    ],
    exposeHeaders: [
        'X-Response-Type',
        'X-Success',
        'X-Failure'
    ]
};