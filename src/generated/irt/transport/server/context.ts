
import { SystemContext } from './context.system';

/**
 * Connection context
 */
export class ConnectionContext<C, T> {
    /**
     * System context for the connection, normally includes original
     * request and response objects, authorization, etc.
     */
    public system: SystemContext<T>;
    /**
     * User provided context
     */
    public user: C | undefined;

    constructor(transport: T, user?: C) {
        this.system = new SystemContext<T>(transport);
        this.user = user;
    }
}