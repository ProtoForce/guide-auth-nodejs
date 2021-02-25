
import { WithEncoder } from '../codec';
import { IRTDate } from './date';
import { IRTTime } from './time';
import { clampAndRound, nanosFromString, nanosToString } from './tools';

const DateTimeFormat = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})(\.\d{1,9})?(([+-](\d{2})\:(\d{2}))|Z)?/

/**
 * IRTDateTime formats
 */
export enum IRTDateTimeFormat {
    /**
     * Local time, ignores the original timezone and uses local timezone
     * 2020-10-10T10:10:10 would be the same time at any location, converted using
     * local time offset and set to this time.
     */
    Local,
    /**
     * Universal time, e.g. UTC
     */
    Universal,
    /**
     * Date and time with an hourly offset
     */
    Offset
}

/**
 * IRTDateTime holds date and time, and provides precision up to nanoseconds. The native
 * JavaScript implementation is limited to milliseconds, while other languages support nano.
 * This class solves the issue and supports variable precision.
 */
export class IRTDateTime implements WithEncoder<string> {
    protected _date: Date;
    protected _nano: number;
    protected _offset?: number;
    protected _format: IRTDateTimeFormat;

    public get year() {
        return this._format === IRTDateTimeFormat.Universal ?
            this._date.getUTCFullYear() : this._date.getFullYear();
    }

    public set year(value: number) {
        if (this._format === IRTDateTimeFormat.Universal) {
            this._date.setUTCFullYear(value);
        } else {
            this._date.setFullYear(value);
        }
    }

    public get month() {
        return this._format === IRTDateTimeFormat.Universal ?
            this._date.getUTCMonth() : this._date.getMonth();
    }

    public set month(value: number) {
        if (this._format === IRTDateTimeFormat.Universal) {
            this._date.setUTCMonth(value);
        } else {
            this._date.setMonth(value);
        }
    }

    public get date() {
        return this._format === IRTDateTimeFormat.Universal ?
            this._date.getUTCDate() : this._date.getDate();
    }

    public set date(value: number) {
        if (this._format === IRTDateTimeFormat.Universal) {
            this._date.setUTCDate(value);
        } else {
            this._date.setDate(value);
        }
    }

    public get hours() {
        return this._format === IRTDateTimeFormat.Universal ?
            this._date.getUTCHours() : this._date.getHours();
    }

    public set hours(value: number) {
        if (this._format === IRTDateTimeFormat.Universal) {
            this._date.setUTCHours(value);
        } else {
            this._date.setHours(value);
        }
    }

    public get minutes() {
        return this._format === IRTDateTimeFormat.Universal ?
            this._date.getUTCMinutes() : this._date.getMinutes();
    }

    public set minutes(value: number) {
        if (this._format === IRTDateTimeFormat.Universal) {
            this._date.setUTCMinutes(value);
        } else {
            this._date.setMinutes(value);
        }
    }

    public get seconds() {
        return this._format === IRTDateTimeFormat.Universal ?
            this._date.getUTCSeconds() : this._date.getSeconds();
    }

    public set seconds(value: number) {
        if (this._format === IRTDateTimeFormat.Universal) {
            this._date.setUTCSeconds(value);
        } else {
            this._date.setSeconds(value);
        }
    }

    public get millis() {
        return this._format === IRTDateTimeFormat.Universal ?
            this._date.getUTCMilliseconds() : this._date.getMilliseconds();
    }

    public set millis(value: number) {
        if (this._format === IRTDateTimeFormat.Universal) {
            this._date.setUTCMilliseconds(value);
        } else {
            this._date.setMilliseconds(value);
        }
        // Clamp to 0-999
        this._nano = clampAndRound(value, 0, 999) * 1000000;
    }

    public get micros() {
        return Math.floor(this._nano / 1000);
    }

    public set micros(value: number) {
        // Clamp to 0-999999
        this._nano = clampAndRound(value, 0, 999999) * 1000;
        const ms = Math.floor(this._nano / 1000000);
        if (this._format === IRTDateTimeFormat.Universal) {
            this._date.setUTCMilliseconds(ms);
        } else {
            this._date.setMilliseconds(ms);
        }
    }

    public get nanos() {
        return this._nano;
    }

    public set nanos(value: number) {
        this._nano = clampAndRound(value, 0, 999999999);
        const ms = Math.floor(this._nano / 1000000);
        if (this._format === IRTDateTimeFormat.Universal) {
            this._date.setUTCMilliseconds(ms);
        } else {
            this._date.setMilliseconds(ms);
        }
    }

    public get epoch() {
        return this._date.getTime();
    }

    public get offset() {
        return this._offset;
    }

    public set offset(value: number | undefined) {
        this._offset = value;
    }

    constructor(data?: string | Date | IRTDateTime, format?: IRTDateTimeFormat) {
        this._format = format || IRTDateTimeFormat.Local;
        if (!data) {
            const now = new Date();
            this._date = now;
            this._nano = 0;
            return;
        }

        if (data instanceof IRTDateTime) {
            this._date = data.toDate();
            this._nano = 0;
            return;
        }

        if (data instanceof Date) {
            this._date = new Date(data);
            this._nano = 0;
            return;
        }

        this.readString(data);
    }

    readDate(value: Date) {
        this._date = new Date(value);
        this._offset = undefined;
    }

    readString(value: string) {
        if (!value.match(DateTimeFormat)) {
            throw new Error(`Expected format: YYYY:MM:DDTHH:MM[:SS][.S-SSSSSSSSS][Z,-00:00,+00:00], got: ${value}`);
        }
        // We need to see if we have something more precise than milliseconds,
        // then we need to extract it and assign to nanos separately
        this._date = new Date(value);

        let nanosIndex = value.indexOf('.');
        if (nanosIndex > 0) {
            let nanos = '';
            nanosIndex++; // shift the .
            while (nanosIndex < value.length) {
                const char = value[nanosIndex];
                if (char >= '0' && char <= '9') {
                    nanos += char;
                    nanosIndex++;
                } else {
                    break;
                }
            }
            this._nano = nanosFromString(nanos);
        } else {
            this._nano = 0;
        }


        const tIndex = value.indexOf('T');
        const posIndex = value.lastIndexOf('+');
        const negIndex = posIndex > 0 ? -1 : value.lastIndexOf('-');
        if (posIndex > 0 || (negIndex > 0 && negIndex > tIndex)) {
            const offsetSign = posIndex > 0 ? 1 : -1;
            const offsetIndex = posIndex > 0 ? posIndex : negIndex;
            const offsetChunks = value.substr(offsetIndex + 1).split(':');
            const hours = parseInt(offsetChunks[0], 10);
            const minutes = parseInt(offsetChunks[1], 10);
            this._offset = offsetSign * (hours * 60 + minutes);
            if (this._format === IRTDateTimeFormat.Offset) {
                // For offset - we do shift the time so that when we emit it
                // during toJSON and generally when we set hours - we use the
                // correct hour, minutes, etc.
                const adjustOffset = -this._date.getTimezoneOffset() - this._offset;
                this._date = new Date(this._date.getTime() - adjustOffset * 60 * 1000);
            }
        }
    }

    toJSON(): string {
        const datePart = `${('0000' + this.year).slice(-4)}-${('00' + (this.month + 1)).slice(-2)}-${('00' + this.date).slice(-2)}`;
        const timePart = `${('00' + this.hours).slice(-2)}:${('00' + this.minutes).slice(-2)}:${('00' + this.seconds).slice(-2)}`;
        const precisionPart = nanosToString(this.nanos);
        const offsetLess = `${datePart}T${timePart}${precisionPart === '' ? '' : '.' + precisionPart}`;

        switch (this._format) {
            case IRTDateTimeFormat.Local:
                return offsetLess;
            case IRTDateTimeFormat.Universal:
                return `${offsetLess}Z`;
            case IRTDateTimeFormat.Offset:
                const offset = typeof this._offset !== 'undefined' ? this._offset : -this._date.getTimezoneOffset();
                const offsetAbs = Math.abs(offset);
                const hours = Math.floor(offsetAbs / 60);
                const minutes = Math.floor(offsetAbs - hours * 60);
                const offsetPart = `${offset > 0 ? '+' : '-'}${('00' + hours).slice(-2)}:${('00' + minutes).slice(-2)}`
                return `${offsetLess}${offsetPart}`;
        }
    }

    toDate(): Date {
        return new Date(this._date);
    }

    toIRTDate(): IRTDate {
        return new IRTDate(this._date);
    }

    toIRTTime(): IRTTime {
        return new IRTTime(this._date);
    }

    static fromJSON(value: string): IRTDateTime {
        return new IRTDateTime(value);
    }

    static fromDate(value: Date): IRTDateTime {
        return new IRTDateTime(value);
    }
}

export class IRTLocalDateTime extends IRTDateTime {
    constructor(data?: string | Date | IRTDateTime) {
        super(data, IRTDateTimeFormat.Local);
    }

    static fromJSON(value: string): IRTLocalDateTime {
        return new IRTLocalDateTime(value);
    }

    static fromDate(value: Date): IRTLocalDateTime {
        return new IRTLocalDateTime(value);
    }
}

export class IRTZonedDateTime extends IRTDateTime {
    constructor(data?: string | Date | IRTDateTime) {
        super(data, IRTDateTimeFormat.Offset);
    }

    static fromJSON(value: string): IRTZonedDateTime {
        return new IRTZonedDateTime(value);
    }

    static fromDate(value: Date): IRTZonedDateTime {
        return new IRTZonedDateTime(value);
    }
}

export class IRTUniversalDateTime extends IRTDateTime {
    constructor(data?: string | Date | IRTDateTime) {
        super(data, IRTDateTimeFormat.Universal);
    }

    static fromJSON(value: string): IRTUniversalDateTime {
        return new IRTUniversalDateTime(value);
    }

    static fromDate(value: Date): IRTUniversalDateTime {
        return new IRTUniversalDateTime(value);
    }
}