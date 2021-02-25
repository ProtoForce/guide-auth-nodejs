
import { WithEncoder } from '../codec';
import { clampAndRound, nanosFromString, nanosToString } from './tools';

const EXPECTED_FORMAT = 'Time has to be in the format HH:MM:[SS][.S-SSSSSSSSS]';

/**
 * IRTTime defines a time object, which only holds hours, minutes, seconds, and nanoseconds
 */
export class IRTTime implements WithEncoder<string> {
    private _hours: number;
    private _minutes: number;
    private _seconds: number;
    private _nano: number;

    /**
     * Get hours value, in the range of [0,23]
     */
    public get hours() {
        return this._hours;
    }

    /**
     * Set hours
     */
    public set hours(value: number) {
        // Clamp to 0-23
        this._hours = clampAndRound(value, 0, 23);
    }

    /**
     * Get minutes value, in the range of [0,59]
     */
    public get minutes() {
        return this._minutes;
    }

    /**
     * Set minutes
     */
    public set minutes(value: number) {
        // Clamp to 0-59
        this._minutes = clampAndRound(value, 0, 59);
    }

    /**
     * Get seconds value, in the range of [0,59]
     */
    public get seconds() {
        return this._seconds;
    }
    /**
     * Set seconds
     */
    public set seconds(value: number) {
        // Clamp to 0-59
        this._seconds = clampAndRound(value, 0, 59);
    }

    /**
     * Get milliseconds, in the range of [0,999]
     */
    public get millis() {
        return Math.floor(this._nano / 1000000);
    }

    /**
     * Set milliseconds
     */
    public set millis(value: number) {
        // Clamp to 0-999
        this._nano = clampAndRound(value, 0, 999) * 1000000;
    }

    /**
     * Get microseconds, in the range of [0,999999]
     */
    public get micros() {
        return Math.floor(this._nano / 1000000);
    }

    /**
     * Set microseconds
     */
    public set micros(value: number) {
        // Clamp to 0-999999
        this._nano = clampAndRound(value, 0, 999999) * 1000;
    }

    /**
     * Get nanoseconds, in the range of [0,999999999]
     */
    public get nanos() {
        return this._nano;
    }

    /**
     * Set nanoseconds
     */
    public set nanos(value: number) {
        // Clamp to 0-999999999
        this._nano = clampAndRound(value, 0, 999999999);
    }

    constructor(data?: string | Date | IRTTime) {
        if (typeof data === 'undefined') {
            this.readDate(new Date());
            if (window && window.performance && window.performance.now) {
                this.micros = window.performance.now();
            }
            return;
        }

        if (data instanceof IRTTime) {
            this._hours = data.hours;
            this._minutes = data.minutes;
            this._seconds = data.seconds;
            this._nano = data.nanos;
            return;
        }

        if (data instanceof Date) {
            this.readDate(data);
            return;
        }

        this.readString(data);
    }

    /**
     * Fill in IRTTime from a Date object
     * @param value Date to be used for IRTTime values
     */
    readDate(value: Date) {
        this._hours = value.getHours();
        this._minutes = value.getMinutes();
        this._seconds = value.getSeconds();
        this.millis = value.getMilliseconds();
    }

    /**
     * Parse a string and fill in IRTTime values from it
     * @param value String IRTTime format: HH:MM:[SS][.S-SSSSSSSSS]
     */
    readString(value: string) {
        // String format: HH:MM:[SS][.S-SSSSSSSSS]
        const chunks = value.split(':');
        if (chunks.length < 2 || chunks.length > 3) {
            throw new Error(`${EXPECTED_FORMAT}, received: ${value}`);
        }

        const hours = parseInt(chunks[0], 10);
        if (isNaN(hours)) {
            throw new Error(`${EXPECTED_FORMAT}, can't parse HH, received: ${value}`);
        }
        if (hours < 0 || hours > 23) {
            throw new Error(`${EXPECTED_FORMAT}, HH expected to be between 0-23, received: ${value}`);
        }

        const minutes = parseInt(chunks[1], 10);
        if (isNaN(minutes)) {
            throw new Error(`${EXPECTED_FORMAT}, can't parse MM, received: ${value}`);
        }
        if (minutes < 0 || minutes > 59) {
            throw new Error(`${EXPECTED_FORMAT}, MM expected to be between 0-59, received: ${value}`);
        }

        this._hours = hours;
        this._minutes = minutes;

        if (chunks.length === 2) {
            this._seconds = 0;
            this._nano = 0;
            return;
        }

        const secChunks = chunks[2].split('.');
        if (secChunks.length > 2) {
            throw new Error(`${EXPECTED_FORMAT}, can't parse seconds part, received: ${value}`);
        }

        const seconds = parseInt(secChunks[0], 10);
        if (isNaN(seconds)) {
            throw new Error(`${EXPECTED_FORMAT}, can't parse SS, received: ${value}`);
        }
        if (seconds < 0 || seconds > 59) {
            throw new Error(`${EXPECTED_FORMAT}, SS expected to be between 0-59, received: ${value}`);
        }


        this._seconds = seconds;
        if (secChunks.length === 1) {
            this._nano = 0;
            return;
        }

        this._nano = nanosFromString(secChunks[1]);
    }

    /**
     * Convert an IRTTime to a JSON string
     */
    toJSON(): string {
        const required = `${('00' + this.hours).slice(-2)}:${('00' + this.minutes).slice(-2)}:${('00' + this.seconds).slice(-2)}`;
        if (this._nano <= 0) {
            return required;
        }

        const resolution = nanosToString(this.nanos);

        if (resolution === '') {
            return required;
        }

        return `${required}.${resolution}`;
    }

    /**
     * Convert IRTTime to a Date object
     */
    toDate(): Date {
        const res = new Date();
        res.setHours(this.hours);
        res.setMinutes(this.minutes);
        res.setSeconds(this.seconds);
        res.setMilliseconds(this.millis);
        return res;
    }

    /**
     * Create an instance of IRTTime from a string
     * @param value String encoded IRTTime
     */
    static fromJSON(value: string): IRTTime {
        return new IRTTime(value);
    }

    /**
     * Create an instance of IRTTime from a Date
     * @param value Date object
     */
    static fromDate(value: Date): IRTTime {
        return new IRTTime(value);
    }
}