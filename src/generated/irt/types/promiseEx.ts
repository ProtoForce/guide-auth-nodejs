
/**
 * An object with a cancellation function 
 */
export interface Cancellable<C = void> {
    cancel: () => C;
}
/**
 * A type which may have a cancellation function
 */
export type MaybeCancellable<C = void> = Partial<Cancellable<C>>;

/**
 * PromiseEx adds an extra MaybeCancellable interface, allowing to cancel
 * an ongoing promise.
 */
export type PromiseEx<T, C = void> = Promise<T> & MaybeCancellable<C>;