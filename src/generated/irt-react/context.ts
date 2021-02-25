import React from 'react';

import { ClientTransport } from '../irt';

export const ServicesTransportContext = React.createContext<ClientTransport | undefined>(undefined);