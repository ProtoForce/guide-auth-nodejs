/**
 * Generic IRTError class which is used as a basis for all other IRT errors
 */
export class IRTError extends Error {
    constructor(message: string) {
        // 'Error' breaks prototype chain here
        super(message);

        // restore prototype chain
        const actualProto = new.target.prototype;

        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, actualProto);
        }
        else {
            // @ts-ignore
            this.__proto__ = actualProto;
        }
    }
}

/**
 * Runtime error interface
 */
export interface RuntimeErrorDefn {
    /**
     * Error message
     */
    message: string;
}

/**
 * Abstract error class for all errors occurring in runtime
 */
export abstract class RuntimeError extends IRTError implements RuntimeErrorDefn {
    message: string;

    constructor(value: {message: string}) {
        super(value.message);
        this.message = value.message;
    }

    throw() {
        throw this;
    }
}

/**
 * Invalid parameters error
 */
export class InvalidParamsError extends IRTError {
    constructor(message: string) {
        super(`Invalid params error: ${message}`);
    }
}

/**
 * Codec error
 */
export class CodecError extends IRTError {
    constructor(message: string) {
        super(`Codec error: ${message}`);
    }
}

/**
 * Network operations error
 */
export class NetworkError extends IRTError {
    constructor(message: string) {
        super(`Network error: ${message}`);
    }
}