
import { WithEncoder } from '../codec';

const EXPECTED_FORMAT = 'Date has to be in the format YYYY-MM-DD';

/**
 * IRTDate date type, supports encoding and decoding in JSON
 */
export class IRTDate implements WithEncoder<string> {
    // @ts-ignore TS incorrectly assumes this won't be initialized in the constructor
    private _value: Date;

    /**
     * Get the year, using local time
     */
    public get year() {
        return this._value.getFullYear();
    }

    /**
     * Set the year
     */
    public set year(value: number) {
        this._value.setFullYear(value);
    }

    /**
     * Get the month, using local time
     */
    public get month() {
        return this._value.getMonth();
    }

    /**
     * Set month
     */
    public set month(value: number) {
        this._value.setMonth(value);
    }

    /**
     * Get day of the month, using local time
     */
    public get date() {
        return this._value.getDate();
    }

    /**
     * Set day of the month
     */
    public set date(value: number) {
        this._value.setDate(value);
    }

    /**
     * Get time in milliseconds since epoch, UTC
     */
    public get epoch() {
        return this._value.getTime();
    }

    constructor(data?: string | Date | IRTDate) {
        if (!data) {
            this._value = new Date();
            return;
        }

        if (data instanceof IRTDate) {
            this._value = data.toDate();
            return;
        }

        if (data instanceof Date) {
            this.readDate(data);
            return;
        }

        this.readString(data);
    }

    readDate(value: Date) {
        this._value = new Date(value.getTime());
    }

    /**
     * Parse date from a string
     * @param value String representation of the date in format: YYYY-MM-DD
     */
    readString(value: string) {
        // String format: YYYY-MM-DD
        const chunks = value.split('-');
        if (chunks.length !== 3) {
            throw new Error(`${EXPECTED_FORMAT}, received: ${value}`);
        }

        const year = parseInt(chunks[0], 10);
        if (isNaN(year)) {
            throw new Error(
                `${EXPECTED_FORMAT}, can't parse YYYY, received: ${value}`
            );
        }

        const month = parseInt(chunks[1], 10);
        if (isNaN(month)) {
            throw new Error(`${EXPECTED_FORMAT}, can't parse MM, received: ${value}`);
        }
        if (month < 1 || month > 12) {
            throw new Error(
                `${EXPECTED_FORMAT}, MM expected to be between 1-12, received: ${value}`
            );
        }

        const day = parseInt(chunks[2], 10);
        if (isNaN(day)) {
            throw new Error(`${EXPECTED_FORMAT}, can't parse DD, received: ${value}`);
        }
        if (day < 1 || day > 32) {
            throw new Error(
                `${EXPECTED_FORMAT}, DD expected to be between 1-31, received: ${value}`
            );
        }

        // native Date stores months as 0 to 11
        this._value = new Date(year, month - 1, day);
    }

    /**
     * Encode IRTDate to a string format, YYYY-MM-DD
     */
    toJSON(): string {
        return `${('0000' + this.year).slice(-4)}-${('00' + (this.month + 1)).slice(-2)}-${('00' + this.date).slice(-2)}`;
    }

    /**
     * Get native javascript Date from an IRTDate
     */
    toDate(): Date {
        return new Date(this._value.getTime());
    }

    /**
     * Create IRTDate from a string
     * @param value String encoded date
     */
    static fromJSON(value: string): IRTDate {
        return new IRTDate(value);
    }

    /**
     * Create IRTDate from a date
     * @param value Date object
     */
    static fromDate(value: Date): IRTDate {
        return new IRTDate(value);
    }
}