
import { ServiceDispatcher } from '../dispatcher';
import { ConnectionContext } from './context';
import { ServerTransportMeta } from '../transport';
import { HTTPMethod } from '../http';
import { IRTError } from '../../types';

/**
 * Routing path wild card
 */
export const RoutingWildCard = '{*}';

/**
 * Routed servuce definition
 */
export interface RoutedService<C, T, I = unknown, O = unknown, IS = unknown, OS = unknown, HI = unknown, HO = unknown> {
    /**
     * Service, if present for the current route
     */
    service?: ServiceDispatcher<ConnectionContext<C, T>>;
    /**
     * Method for the path
     */
    method: string;
    /**
     * Meta details
     */
    meta: ServerTransportMeta<I, O, IS, OS, HI, HO>;
}

/**
 * Routing map for services
 */
export interface RoutingMap<C, T> {
    /**
     * Key is a chunk of the path, e.g. companies
     */
    routes: {[key: string]: RoutingMap<C, T>};

    /**
     * Key is the HTTP verb for this path
     */
    service?: {[key: string]: RoutedService<C, T>};
}

/**
 * Route conflict error
 */
export class RouteConflictError extends IRTError {
    constructor(message: string) {
        super(`Route conflict error: ${message}`);
    }
}

function collectRoutes<C, T>(services: ServiceDispatcher<ConnectionContext<C, T>>[]):
    Array<{chunks: string[], verb: HTTPMethod, service: RoutedService<C, T>, optional?: boolean}> {
    const res: Array<{chunks: string[], verb: HTTPMethod, service: RoutedService<C, T>, optional?: boolean}> = [];
    services.forEach(s => {
        const service = s.RTTI_CLASS;
        const serviceFQN = s.RTTI_FQN;
        const methods = s.methods;
        Object.keys(methods).forEach(method => {
            const meta = methods[method];
            // Add unique fqn com.company.service/method one
            res.push({
                chunks: [serviceFQN, method],
                verb: HTTPMethod.POST,
                service: {
                    service: s,
                    method,
                    meta
                }
            });
            // Add default service/method one, it is optional
            res.push({
                chunks: [service, method],
                verb: HTTPMethod.POST,
                service: {
                    service: s,
                    method,
                    meta
                },
                optional: true
            });

            // See if we need to add a rest one
            if (meta.in && meta.in.restSpec) {
                const path = meta.in.restSpec.extractor.pathSpec.map(ps => {
                    switch (ps.type) {
                        case 'word': return ps.value;
                        case 'param': return RoutingWildCard;
                    }
                });

                res.push({
                    chunks: path,
                    verb: meta.in.restSpec.method,
                    service: {
                        service: s,
                        method,
                        meta
                    }
                });
            }
        });
    });
    return res;
}

/**
 * Build server routes creates a routing map using REST definitions and services supported methods
 * @param services An array of services to build a routing map for
 */
export function buildServerRoutes<C, T>(services: ServiceDispatcher<ConnectionContext<C, T>>[]): RoutingMap<C, T> {
    const routes: RoutingMap<C, T> = {routes: {}};
    const collected = collectRoutes(services);
    for (const c of collected) {
        const { chunks, verb, service, optional } = c;
        let route: RoutingMap<C, T> = routes;
        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            if (chunk in route.routes) {
                route = route.routes[chunk];
            } else {
                const newRoute: RoutingMap<C, T> = {routes: {}};
                route.routes[chunk] = newRoute;
                route = newRoute;
            }
        }

        if (route.service && route.service[verb] && !optional) {
            const existing = route.service[verb];
            if (existing.service && service.service) {
                throw new RouteConflictError(
                    `Route ${chunks.join('/')} conflict: ${existing.service.RTTI_CLASS}.${existing.method} and ${service.service.RTTI_CLASS}.${route.service.method}`
                );
            }
        }
        if (!route.service) {
            route.service = {};
        }
        route.service[verb] = service;
    }
    return routes;
}

/**
 * Find a server route within the routing map for the provided URL and method
 * @param routes Routing map, previously built
 * @param urlPath URL to find routing to
 * @param method Method for the URL
 */
export function findServerRoute<C, T>(routes: RoutingMap<C, T>, urlPath: string, method: string): RoutingMap<C, T> | undefined {
    const pathAndQuery = urlPath.split('?');
    const routeChunks = pathAndQuery[0].split('/');
    let routeChunk: RoutingMap<C, T> = routes;
    for (let i = 0; i < routeChunks.length; i++) {
        const chunk = routeChunks[i];
        const exactChunk = routeChunk.routes[chunk];
        if (exactChunk) {
            routeChunk = exactChunk;
        } else {
            routeChunk = routeChunk.routes[RoutingWildCard];
            if (!routeChunk) {
                // Nothing found, we can return now
                break;
            }
        }
    }

    if (!routeChunk || !routeChunk.service || !routeChunk.service[method]) {
        return undefined;
    }

    return routeChunk;
}

/**
 * Build an array of routes for the provided services. Good for utilitary functions
 * @param services An array of services
 */
export function compileServerRoutesList<C, T>(services: ServiceDispatcher<ConnectionContext<C, T>>[]): string[] {
    return collectRoutes(services)
        .map(r => `${r.verb} ${r.chunks.join('/')} ${r.service.service?.RTTI_CLASS}.${r.service.method}`)
        .sort();
}