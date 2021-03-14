import {
    Left,
    Right
} from '@auth/irt';
import {
    ForbiddenError,
    InternalError,
    NotFoundError,
    AlreadyExistsError
 } from '@auth/service';
 
import { ServiceContext } from './context';

// Let's define a bunch of possible output ADTs,
// which may have various errors as a possible outcome.
// Technically, we define static constructors from a 
// different type of error.

export interface WithForbiddenError<T> {
    new(): T;
    fromForbiddenError: (err: ForbiddenError) => T;
}

export interface WithInternalError<T> {
    new(): T;
    fromInternalError: (err: InternalError) => T;
}

export interface WithNotFoundError<T> {
    new(): T;
    fromNotFoundError: (err: NotFoundError) => T;
}

export interface WithAlreadyExistsError<T> {
    new(): T;
    fromAlreadyExistsError: (err: AlreadyExistsError) => T;
}

// It is handy to create a response just by providing a message, here we define
// a bunch of possible errors that we'd want to return, the first parameter
// being an output type which can be constructed with an error, then a promise
// resolve function and the message or other data to be provided along with the error.

export function invokeForbiddenError<T extends WithForbiddenError<L>, L, R>(
    type: T,
    resolve: (type: Left<L, R> | Right<L, R>) => void,
    message: string = 'Forbidden'
) {
    resolve(new Left(type.fromForbiddenError(
        new ForbiddenError({
            message
        })
    )));
}

export function invokeInternalError<T extends WithInternalError<L>, L, R, E extends Error | string>(
    type: T,
    resolve: (type: Left<L, R> | Right<L, R>) => void,
    message: E
) {
    resolve(new Left(type.fromInternalError(
        new InternalError({
            message: `${message}`
        })
    )));
}

export function invokeNotFoundError<T extends WithNotFoundError<L>, L, R, E extends Error | string>(
    type: T,
    resolve: (type: Left<L, R> | Right<L, R>) => void,
    message: E
) {
    resolve(new Left(type.fromNotFoundError(
        new NotFoundError({
            message: `${message}`
        })
    )));
}

export function invokeAlreadyExistsError<T extends WithAlreadyExistsError<L>, L, R, E extends Error | string>(
    type: T,
    resolve: (type: Left<L, R> | Right<L, R>) => void,
    message: E
) {
    resolve(new Left(type.fromAlreadyExistsError(
        new AlreadyExistsError({
            message: `${message}`
        })
    )));
}

// Helper function which guards methods by checking user authorization. If not authorized, automatically
// invokes Forbidden error and returns true.

export function isAuthorized<T extends WithForbiddenError<L>, L, R>(
    context: ServiceContext,
    type: T,
    resolve: (type: Left<L, R> | Right<L, R>) => void,
    message: string = 'Forbidden'
) {
    if (!context.user || !context.user.userID) {
        invokeForbiddenError(type, resolve, message);
        return false;
    }
    return true;
}
