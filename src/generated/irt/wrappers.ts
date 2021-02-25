
// import { Formatter } from './formatter';
import { WithRTTI } from './rtti';
import { WithEncoder  } from './codec';
import {
    Type_UInt08,
    Type_Int08,
    Type_UInt16,
    Type_Int16,
    Type_UInt32,
    Type_Int32,
    Type_UInt64,
    Type_Int64,
    Type_Float,
    Type_Double,
    Type_String,
    Type_UUID
} from './types/builtintypes';

/**
 * IRT Wrapper around scalars and other primitive types which supports encoding and RTTI
 */
export abstract class IRTWrapper<T, TS> implements WithEncoder<TS>, WithRTTI {
    static RTTI_CLASS: string;
    static RTTI_FQN: string;
    value: T;

    protected constructor(value: T) {
        this.value = value;
    }

    get RTTI_CLASS(): string {
        return Scalar.RTTI_CLASS;
    }

    get RTTI_FQN(): string {
        return Scalar.RTTI_FQN;
    }

    abstract toJSON(): TS;
}

/**
 * Abstract class to hold a scalar value
 */
export abstract class Scalar<T> extends IRTWrapper<T, T> {
    protected constructor(value: T) {
        super(value);
    }

    toJSON(): T {
        return this.value;
    }
}

export class ScalarU08 extends Scalar<number> {
    constructor(value: number) {
        ScalarU08.RTTI_CLASS = Type_UInt08;
        ScalarU08.RTTI_FQN = Type_UInt08;
        super(value);
    }
}

export class ScalarI08 extends Scalar<number> {
    constructor(value: number) {
        ScalarI08.RTTI_CLASS = Type_Int08;
        ScalarI08.RTTI_FQN = Type_Int08;
        super(value);
    }
}

export class ScalarU16 extends Scalar<number> {
    constructor(value: number) {
        ScalarU16.RTTI_CLASS = Type_UInt16;
        ScalarU16.RTTI_FQN = Type_UInt16;
        super(value);
    }
}

export class ScalarI16 extends Scalar<number> {
    constructor(value: number) {
        ScalarI16.RTTI_CLASS = Type_Int16;
        ScalarI16.RTTI_FQN = Type_Int16;
        super(value);
    }
}

export class ScalarU32 extends Scalar<number> {
    constructor(value: number) {
        ScalarU32.RTTI_CLASS = Type_UInt32;
        ScalarU32.RTTI_FQN = Type_UInt32;
        super(value);
    }
}

export class ScalarI32 extends Scalar<number> {
    constructor(value: number) {
        ScalarI32.RTTI_CLASS = Type_Int32;
        ScalarI32.RTTI_FQN = Type_Int32;
        super(value);
    }
}

export class ScalarU64 extends Scalar<number> {
    constructor(value: number) {
        ScalarU64.RTTI_CLASS = Type_UInt64;
        ScalarU64.RTTI_FQN = Type_UInt64;
        super(value);
    }
}

export class ScalarI64 extends Scalar<number> {
    constructor(value: number) {
        ScalarI64.RTTI_CLASS = Type_Int64;
        ScalarI64.RTTI_FQN = Type_Int64;
        super(value);
    }
}

export class ScalarFloat extends Scalar<number> {
    constructor(value: number) {
        ScalarFloat.RTTI_CLASS = Type_Float;
        ScalarFloat.RTTI_FQN = Type_Float;
        super(value);
    }
}

export class ScalarDouble extends Scalar<number> {
    constructor(value: number) {
        ScalarDouble.RTTI_CLASS = Type_Double;
        ScalarDouble.RTTI_FQN = Type_Double;
        super(value);
    }
}

export class ScalarString extends Scalar<string> {
    constructor(value: string) {
        ScalarString.RTTI_CLASS = Type_String;
        ScalarString.RTTI_FQN = Type_String;
        super(value);
    }
}

export class ScalarUUID extends Scalar<string> {
    constructor(value: string) {
        ScalarUUID.RTTI_CLASS = Type_UUID;
        ScalarUUID.RTTI_FQN = Type_UUID;
        super(value);
    }
}

// export class ADTScalarDate extends ADTScalarPrepared<Date, string> {
//     constructor(value: Date) {
//         ADTScalarDouble.ClassName = "date";
//         super(value);
//     }
//
//     prepare(): string {
//         return Formatter.writeDate(this.value);
//     }
// }
//
// export class ADTScalarTime extends ADTScalarPrepared<Date, string> {
//     constructor(value: Date) {
//         ADTScalarDouble.ClassName = "time";
//         super(value);
//     }
//
//     prepare(): string {
//         return Formatter.writeTime(this.value);
//     }
// }


export interface IRTADT<TYPES, TYPESFLAT> extends WithRTTI {
    value: TYPES;
    flatValue: TYPESFLAT;
    map<T = void>(func: (value: TYPES) => T): T;
    flatMap<T = void>(func: (value: TYPESFLAT) =>T ): T;
}