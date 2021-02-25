import { useCallback } from 'react';
import {
    QueryRequestState,
    RequestTransformFunc,
    RequestValidateFunc,
    defaultRetryDecay,
    useQuery,
    CacheKeyParam,
    QueryArgs
} from '@dyssent/fetcherjs';

import { ServiceQueryOptions } from './options';
import { Either } from '../irt';

export interface EitherQueryOptions<
    L,
    R,
    RT = R,
    ST = R,
    E extends Error | L = Error,
    ARGS extends unknown[] = unknown[],
    TC = void
    > extends Omit<ServiceQueryOptions<R, Either<L, RT>, ST, E, ARGS, TC>, 'transform' | 'validate'> {
    // Override these two with just an R value, while we extract
    // and validate ourserlves first using the Either semantics
    transform?: RequestTransformFunc<RT, R>;
    validate?: RequestValidateFunc<RT, E>;

    shouldRetry?: (error: E) => boolean;
}

export function useEitherQuery<L, R, RT = R, ST = R, E extends Error | L = Error | L, ARGS extends unknown[] = unknown[], TC = void>(
    key: CacheKeyParam,
    request: (...args: ARGS) => Promise<Either<L, RT>>,
    options: EitherQueryOptions<L, R, RT, ST, E, ARGS, TC>,
    ...args: QueryArgs<CacheKeyParam, ARGS>
): QueryRequestState<R, E> {
    const validate = useCallback(
        (payload: Either<L, RT>): Promise<E | undefined> => {
            // @ts-ignore
            return Promise.resolve(payload.bifold(
                right => (options.validate ? options.validate(right) : undefined),
                left => left
            ));
        },
        [options.validate]
    );

    const transform = useCallback(
        (payload: Either<L, RT>): Promise<R> => {
            return Promise.resolve(payload.bifold(
                (vr: RT) => (options.transform ? options.transform(vr) : vr) as Promise<R>,
                _ => {
                    throw new Error(`Should never get into transform with a Left branch of Either`);
                }
            ));
        },
        [options.transform]
    );

    const retryDecay = useCallback(
        (attempts: number, e: E) => {
            const should = options.shouldRetry ? options.shouldRetry(e) : true;
            if (!should) {
                return false;
            }

            return options.retryDecay
                ? typeof options.retryDecay === 'function'
                    ? options.retryDecay(attempts, e)
                    : options.retryDecay
                : defaultRetryDecay(attempts);
        },
        [options.shouldRetry, options.retryDecay]
    );

    return useQuery<R, Either<L, RT>, ST, E, ARGS>(key, request, {
        ...options,
        transform,
        retryDecay,
        validate
    }, ...(args as ARGS));
}