
/**
 * Either type, which allows a type to be one of two options.
 * Left is considered a wrong / error type, while right is the
 * valid type.
 */
export type Either<L, A> = Left<L, A> | Right<L, A>;

/**
 * Either encoded in JSON for the left type
 */
export interface LeftJSON<LS> {
    left: LS;
    right?: undefined;
}

/**
 * Either encoded in JSON for the right type
 */
export interface RightJSON<AS> {
    left?: undefined;
    right: AS;
}

/**
 * Either encoded in JSON for either left or right type
 */
export type EitherJSON<LS, AS> = LeftJSON<LS> | RightJSON<AS>;

/**
 * Either Left implementation
 */
export class Left<L, A> {
    constructor(readonly value: L) {
    }

    /**
     * Map Either<L, A> to Either<L, B>
     * @param f Transformation from A to B
     */
    public map<B>(f: (a: A) => B): Either<L, B> {
        return this as any;
    }

    /**
     * Map Either<L, A> to Either<V, B>
     * @param g Transformation from L to V
     * @param f Transformation from A to B
     */
    public bimap<V, B>(g: (a: A) => B, f: (l: L) => V): Either<V, B> {
        return new Left(f(this.value));
    }

    /**
     * Fold Either<L, A> to B
     * @param whenRight Transformation from A to B
     * @param whenLeft Transformation from L to B
     */
    public fold<B>(whenRight: (a: A) => B, whenLeft: (l: L) => B): B {
        return whenLeft(this.value);
    }

    /**
     * Fold Either<L, A> to V | B
     * @param whenRight Transformation from A to B
     * @param whenLeft Transformation from L to V
     */
    public bifold<V, B>(whenRight: (a: A) => B, whenLeft: (l: L) => V): V | B {
        return whenLeft(this.value);
    }

    /**
     * Get the Right value
     * @param a To be used instead of Left branch if needed
     */
    public getOrElse(a: A): A {
        return a;
    }

    /**
     * Is a stored value of Left type
     */
    public isLeft(): this is Left<L, A> {
        return true;
    }

    /**
     * Is a stored value of Right type
     */
    public isRight(): this is Right<L, A> {
        return false;
    }

    /**
     * Swap the Either<L, A> to Either<A, L>
     */
    public swap(): Either<A, L> {
        return new Right(this.value);
    }

    /**
     * If a stored value of Right type, checks whether it satisfies the filter,
     * if not - then the zero value is used to become a Left branched Either
     * @param p Filter function
     * @param zero Value to be used if Filter is not satisfied
     */
    public filterOrElse(p: (a: A) => boolean, zero: L): Either<L, A> {
        return this;
    }

    /**
     * Execute functions for right or left branches depending on the stored type
     * @param whenRight To be called when a stored value is Right
     * @param whenLeft To be called when a stored value is Left
     */
    public match(whenRight: (value: A) => void, whenLeft:  (value: L) => void): void {
        whenLeft(this.value);
    }

    /**
     * Encode Either<L, A> to JSON EitherJSON<LS, AS>
     * @param whenRight Transformation from A to AS
     * @param whenLeft Transformation from L to LS
     */
    public toJSON<LS, AS>(whenRight: (a: A) => AS, whenLeft: (l: L) => LS): EitherJSON<LS, AS> {
        return {
            left: whenLeft(this.value),
            right: undefined
        };
    }
}

export class Right<L, A> {
    constructor(readonly value: A) {
    }

    /**
     * Map Either<L, A> to Either<L, B>
     * @param f Transformation from A to B
     */
    public map<B>(f: (a: A) => B): Either<L, B> {
        return new Right(
            f(this.value)
        );
    }

    /**
     * Map Either<L, A> to Either<V, B>
     * @param g Transformation from L to V
     * @param f Transformation from A to B
     */
    public bimap<V, B>(g: (a: A) => B, f: (l: L) => V): Either<V, B> {
        return new Right<V, B>(
            g(this.value)
        );
    }

    /**
     * Fold Either<L, A> to B
     * @param whenRight Transformation from A to B
     * @param whenLeft Transformation from L to B
     */
    public fold<B>( whenRight: (a: A) => B, whenLeft: (l: L) => B): B {
        return whenRight(this.value);
    }

    /**
     * Fold Either<L, A> to V | B
     * @param whenRight Transformation from A to B
     * @param whenLeft Transformation from L to V
     */
    public bifold<V, B>(whenRight: (a: A) => B, whenLeft: (l: L) => V): V | B {
        return whenRight(this.value);
    }

    /**
     * Get the Right value
     * @param a To be used instead of Left branch if needed
     */
    public getOrElse(a: A): A {
        return this.value;
    }

    /**
     * Is a stored value of Left type
     */
    public isLeft(): this is Left<L, A> {
        return false;
    }

    /**
     * Is a stored value of Right type
     */
    public isRight(): this is Right<L, A> {
        return true;
    }

    /**
     * Swap the Either<L, A> to Either<A, L>
     */
    public swap(): Either<A, L> {
        return new Left(this.value);
    }

    /**
     * If a stored value of Right type, checks whether it satisfies the filter,
     * if not - then the zero value is used to become a Left branched Either
     * @param p Filter function
     * @param zero Value to be used if Filter is not satisfied
     */
    public filterOrElse(p: (a: A) => boolean, zero: L): Either<L, A> {
        return p(this.value) ? this : left(zero);
    }

    /**
     * Execute functions for right or left branches depending on the stored type
     * @param whenRight To be called when a stored value is Right
     * @param whenLeft To be called when a stored value is Left
     */
    public match(whenRight: (value: A) => void, whenLeft:  (value: L) => void): void {
        whenRight(this.value);
    }

    /**
     * Encode Either<L, A> to JSON EitherJSON<LS, AS>
     * @param whenRight Transformation from A to AS
     * @param whenLeft Transformation from L to LS
     */
    public toJSON<LS, AS>(whenRight: (a: A) => AS, whenLeft: (l: L) => LS): EitherJSON<LS, AS> {
        return {
            right: whenRight(this.value)
        };
    }
}

/**
 * Helper function to create a Right branches Either from a Right value
 * @param a Value of right type
 */
export const right = <L, A>(a: A): Either<L, A> => {
    return new Right<L, A>(a);
};

/**
 * Helper function to create a Left branches Either from a Left value
 * @param a Value of left type
 */
export const left = <L, A>(l: L): Either<L, A> => {
    return new Left<L, A>(l);
};

/**
 * Creates Either from JSON
 * @param value JSON encoded Either value
 * @param whenRight Transformation to be applied when a stored value is of Left type
 * @param whenLeft Transformation to be applied when a stored value is of Right type
 */
export function fromEitherJSON<LS, AS, L, A>(value: EitherJSON<LS, AS>, whenRight: (a: AS) => A, whenLeft: (l: LS) => L): Either<L, A> {
    if (typeof value.left !== 'undefined') {
        return left(whenLeft(value.left));
    } else
    if (typeof value.right !== 'undefined') {
        return right(whenRight(value.right));
    }

    throw new Error(`fromEitherJSON expects the value to have either left or right, but got: '${value}'`)
}