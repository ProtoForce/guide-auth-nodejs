import { WithRTTI } from '../rtti';
import { ServerTransportMeta } from './transport';

/**
 * A map of methods known to a service dispatcher
 */
export type ServiceDispatcherMethods = {[key: string]: ServerTransportMeta<any, any, any, any, any, any>};

/**
 * Service Dispatcher interface
 */
export interface ServiceDispatcher<C> extends WithRTTI {
    /**
     * Dispatch a method execution
     * @param context Context for the method call
     * @param method Method to be called
     * @param data Data for the method
     */
    dispatch(context: C, method: string, data?: unknown | undefined): Promise<unknown>;
    readonly methods: ServiceDispatcherMethods;
}

/**
 * Service dispatcher aware interface, which allows to identify
 * automatically a dispatcher for a particular service implementation
 */
export interface ServiceDispatcherAware<C> {
    $dispatcher(): ServiceDispatcher<C>;
}