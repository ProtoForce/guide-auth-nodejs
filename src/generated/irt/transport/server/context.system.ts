
import { Authorization } from '../auth';

/**
 * System Context
 */
export class SystemContext<T = void> {
    /**
     * Authorization details, if any
     */
    public auth: Authorization;
    /**
     * Transport specific context
     */
    public transport: T;

    constructor(transport: T) {
        this.auth = new Authorization();
        this.transport = transport;
    }
}