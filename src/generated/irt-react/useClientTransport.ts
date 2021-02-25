import { useContext } from 'react';

import { MissingTransportError } from './error';
import { ServiceOptions } from './options';
import { ServicesTransportContext } from './context';
import { ClientTransport, WithRTTI } from '../irt';

export function useClientTransport<TC>(service: WithRTTI, options?: ServiceOptions<TC>) {
    const contextTransport = useContext(ServicesTransportContext);
    const clientTransport = options?.transport || ((contextTransport as unknown) as ClientTransport<TC>);

    if (!clientTransport) {
        throw new MissingTransportError(service);
    }
    return clientTransport;
}