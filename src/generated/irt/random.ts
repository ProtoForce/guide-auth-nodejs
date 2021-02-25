import { IRTDate, IRTDateTime, IRTDateTimeFormat, IRTTime } from './types';

/**
 * Random class provides a set of functions to generate random values
 */
export class Random {
    /**
     * Chooses randomly one of the options from an array
     * @param from Array of options
     */
    static choose<T>(from: T[]): T {
        return from[Math.floor(Math.random() * from.length)];
    }

    /**
     * Random number in range [min,max], with rounding if needed
     * @param min Minimal value
     * @param max Maximum value
     * @param round If true, will be rounded
     */
    static rndNumber(min: number, max: number, round: boolean): number {
        const range = Math.random() * (max - min + 1);
        return (round ? Math.floor(range) : range) + min;
    }

    /**
     * Random value for type U08
     */
    static nextU08(): number {
        return Random.rndNumber(0, 255, true);
    }

    /**
     * Random value for type I08
     */
    static nextI08(): number {
        return Random.rndNumber(-128, 127, true);
    }

    /**
     * Random value for type U16
     */
    static nextU16(): number {
        return Random.rndNumber(0, 65535, true);
    }

    /**
     * Random value for type I16
     */
    static nextI16(): number {
        return Random.rndNumber(-32768, 32767, true);
    }

    /**
     * Random value for type U32
     */
    static nextU32(): number {
        return Random.rndNumber(0, 4294967295, true);
    }

    /**
     * Random value for type I32
     */
    static nextI32(): number {
        return Random.rndNumber(-2147483648, 2147483647, true);
    }

    /**
     * Random value for type U64
     */
    static nextU64(): number {
        return Random.rndNumber(0, Number.MAX_SAFE_INTEGER, true);
    }

    /**
     * Random value for type I64
     */
    static nextI64(): number {
        return Random.rndNumber(-Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, true);
    }

    /**
     * Random value for type float
     */
    static nextFloat(): number {
        return Random.rndNumber(-2147483648, 2147483647, false);
    }

    /**
     * Random value for type double
     */
    static nextDouble(): number {
        return Random.rndNumber(-Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, false);
    }

    /**
     * Random value for type UUID
     */
    static nextUUID(): string {
        // https://github.com/Steve-Fenton/TypeScriptUtilities
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Random value for type BigInt
     */
    static nextBigInt(): bigint {
        return BigInt(Random.rndNumber(-Number.MIN_VALUE, Number.MAX_VALUE, true));
    }

    /**
     * Random value of type Boolean
     */
    static nextBool(): boolean {
        return Random.nextI16() > 0;
    }

    /**
     * Random value of type string
     */
    static nextString(): string {
        const length = Random.nextU08();
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    /**
     * Random value out of enumeration
     * @param enums Enumeration values
     */
    static nextEnum<T>(enums: T[]): T {
        return Random.choose(enums);
    }

    /**
     * Random IRTDateTime value
     * @param format Format for the IRTDateTime
     */
    static nextDateTime(format: IRTDateTimeFormat): IRTDateTime {
        const dt = new IRTDateTime(undefined, format);
        dt.year = Random.rndNumber(1970, 2100, true);
        dt.month = Random.rndNumber(0, 11, true);
        dt.date = Random.rndNumber(1, 28, true);
        dt.hours = Random.rndNumber(0, 23, true);
        dt.minutes = Random.rndNumber(0, 59, true);
        dt.seconds = Random.rndNumber(0, 59, true);
        dt.nanos = Random.rndNumber(0, 999999999, true);
        // TODO Add random offset here
        /*
          val offset = if (random.nextBoolean()) {
            random.nextInt(3600 * 2)
          } else {
            - random.nextInt(3600 * 2)
          }
         */
        return dt;
    }

    /**
     * Random local IRTDateTime
     */
    static nextLocalDateTime(): IRTDateTime {
        return Random.nextDateTime(IRTDateTimeFormat.Local);
    }

    /**
     * Random zoned IRTDateTime
     */
    static nextZonedDateTime(): IRTDateTime {
        return Random.nextDateTime(IRTDateTimeFormat.Offset);
    }

    /**
     * Random universal IRTDateTime
     */
    static nextUniversalDateTime(): IRTDateTime {
        return Random.nextDateTime(IRTDateTimeFormat.Universal);
    }

    /**
     * Random IRTTime
     */
    static nextTime(): IRTTime {
        return Random.nextLocalDateTime().toIRTTime();
    }

    /**
     * Random IRTDate
     */
    static nextDate(): IRTDate {
        return Random.nextLocalDateTime().toIRTDate();
    }

    /**
     * Random blob
     */
    static nextBlob(): Uint8Array {
        const l = Random.nextU08() + 16;
        const content: number[] = [];
        for (let i = 0; i < l; i++)
            content.push(Random.nextU08());
        return new Uint8Array(content);
    }
}