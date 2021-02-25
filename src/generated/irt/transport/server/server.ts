import { ConnectionContext } from './context';

export interface TransportHandlers<C, T, R> {
    onConnect(context: ConnectionContext<C, T>, request: R): boolean
    onAuth(context: ConnectionContext<C, T>): boolean
    onDisconnect(context: ConnectionContext<C, T>): void
}