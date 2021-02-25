import { QueryOptions, MutationOptions } from '@dyssent/fetcherjs';

import { ClientTransport } from '../irt';

export interface ServiceOptions<TC> {
    transport?: ClientTransport<TC>;
}

export type ServiceQueryOptions<T, RT = T, ST = T, E = Error, ARGS extends unknown[] = unknown[], TC = void> =
    QueryOptions<T, RT, ST, E, ARGS> & ServiceOptions<TC>;

export type ServiceMutationOptions<T, C, RT = T, E = Error, ARGS extends unknown[] = unknown[], TC = void> =
    MutationOptions<T, C, RT, E, ARGS> & ServiceOptions<TC>;