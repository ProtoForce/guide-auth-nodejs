import { useCallback } from 'react';
import { Manager, useMutation } from '@dyssent/fetcherjs';

import { Either } from '../irt';
import { ServiceMutationOptions } from './options';

// Override onSuccess with R side of the Either
export type EitherMutationOptions<
    L,
    R,
    C = unknown,
    E extends Error | L = Error,
    ARGS extends unknown[] = unknown[],
    TC = void
    > = Omit<ServiceMutationOptions<Either<L, R>, C, Either<L, R>, L | E, ARGS, TC>, 'onSuccess' | 'onComplete'> & {
    onSuccess?: (data: R, captured: C, manager: Manager, ...args: ARGS) => void;
    onComplete?: (data: R | undefined, error: L | E | undefined, captured: C, manager: Manager, ...args: ARGS) => void;
};

export function useEitherMutation<L, R, C = unknown, E extends Error | L = Error, ARGS extends unknown[] = unknown[], TC = void>(
    request: (...args: ARGS) => Promise<Either<L, R>>,
    options: EitherMutationOptions<L, R, C, E | L, ARGS, TC> = {}
) {
    // With either, success is not always success, so we may rebind here
    // and take into account GenericFailure instance possibility
    const sucessCallback = useCallback(
        (data: Either<L, R>, captured: C, manager: Manager, ...args: ARGS) => {
            const success = options.onSuccess;
            if (!success) {
                return;
            }
            data.match(
                right => success(right, captured, manager, ...args),
                left => {
                    if (!options.onError) {
                        return;
                    }
                    options.onError(left, captured, manager, ...args);
                }
            );
        },
        [options.onSuccess, options.onError]
    );

    const completeCallback = useCallback(
        (data: Either<L, R> | undefined, error: L | E | undefined, captured: C, manager: Manager, ...args: ARGS) => {
            const complete = options.onComplete;
            if (!complete) {
                return;
            }
            if (data) {
                data.match(
                    right => complete(right, undefined, captured, manager, ...args),
                    left => complete(undefined, left, captured, manager, ...args)
                );
            } else {
                complete(undefined, error, captured, manager, ...args)
            }
        },
        [options.onComplete]
    );

    return useMutation<Either<L, R>, C, Either<L, R>, E | L, ARGS>(request, {
        ...options,
        onSuccess: sucessCallback,
        onComplete: completeCallback
    });
}