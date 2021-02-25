import { useMemo } from 'react';
import { QueryOptions } from '@dyssent/fetcherjs';

import { EitherQueryOptions } from './useEitherQuery';

export function useServiceEitherOptions<
    L,
    R,
    RT = R,
    ST = R,
    E extends Error | L = Error,
    ARGS extends unknown[] = unknown[]
    >(
    options: EitherQueryOptions<L, R, RT, ST, E, ARGS>,
    tags: string[],
    secondaryOptions: EitherQueryOptions<L, R, RT, ST, E, ARGS> = {}
): EitherQueryOptions<L, R, RT, ST, E, ARGS> {
    return useServiceOptions(
        options,
        tags,
        secondaryOptions
    );
}

export function useServiceOptions<T, RT = T, ST = T, E extends Error = Error, ARGS extends unknown[] = unknown[],
    OPTS extends {tags?: string[]} = QueryOptions<T, RT, ST, E, ARGS>>(
    options: OPTS,
    tags: string[],
    secondaryOptions?: OPTS
) {
    const injectedTags = useMemo(() => {
        return [...tags, ...(options.tags || []), ...(secondaryOptions?.tags || [])];
    }, [options.tags, secondaryOptions?.tags, tags]);

    return {
        ...options,
        ...secondaryOptions,
        batcherTags: tags,
        tags: injectedTags
    };
}