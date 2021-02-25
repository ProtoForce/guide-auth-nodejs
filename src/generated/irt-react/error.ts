import { WithRTTI, IRTError } from '../irt';

export class MissingTransportError extends IRTError {
    constructor(service: WithRTTI) {
        super(`Transport must be provided explicitly or via context for service ${service.RTTI_CLASS}`);
    }
}