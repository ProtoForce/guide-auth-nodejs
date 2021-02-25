
import {
    IRTDateTime,
    IRTLocalDateTime,
    IRTZonedDateTime,
    IRTUniversalDateTime
} from '../datetime';

describe('IRTDateTime', () => {
    it('Can serialize to JSON', () => {
        const sample = new IRTDateTime();
        expect(() => sample.toJSON()).not.toThrow();
    });

    it('Can deserialize from JSON', () => {
        const sample = new IRTDateTime();
        const json = sample.toJSON();
        expect(() => IRTDateTime.fromJSON(json)).not.toThrow();
    });

    it('Can consistently serialize to and from JSON', () => {
        const sample = new IRTDateTime();
        const json = sample.toJSON();
        console.log(JSON.stringify(sample, undefined, 2));
        const sample2 = IRTDateTime.fromJSON(json);
        const json2 = sample2.toJSON();
        expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
    });

    it('Can properly parse string', () => {
        const sample = IRTDateTime.fromJSON('2000-02-01T10:11:12.345');
        expect(sample.year).toBe(2000);
        expect(sample.month).toBe(1);
        expect(sample.date).toBe(1);
        expect(sample.hours).toBe(10);
        expect(sample.minutes).toBe(11);
        expect(sample.seconds).toBe(12);
        expect(sample.millis).toBe(345);
    });

    it('Can properly output string', () => {
        const sample = IRTDateTime.fromJSON('2000-02-01T10:11:12.345');
        expect(sample.toJSON()).toBe('2000-02-01T10:11:12.345');
    });

    it('Fails on invalid string', () => {
        expect(() => IRTDateTime.fromJSON('2000-02:01T10_11:12.345')).toThrow();
    });

    it('Can preserve nanos during serialization to and from JSON', () => {
        const sample = IRTDateTime.fromJSON('2000-02-01T10:11:12.3456789');
        expect(sample.toJSON()).toBe('2000-02-01T10:11:12.3456789');
    });
});

describe('IRTLocalDateTime', () => {
    it('Can consistently serialize to and from JSON', () => {
        const sample = new IRTLocalDateTime();
        const json = sample.toJSON();
        console.log(JSON.stringify(sample, undefined, 2));
        const sample2 = IRTLocalDateTime.fromJSON(json);
        const json2 = sample2.toJSON();
        expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
    });
});

describe('IRTZonedDateTime', () => {
    it('Can consistently serialize to and from JSON', () => {
        const sample = new IRTZonedDateTime();
        const json = sample.toJSON();
        console.log(JSON.stringify(sample, undefined, 2));
        const sample2 = IRTZonedDateTime.fromJSON(json);
        const json2 = sample2.toJSON();
        expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
    });

    it('Can properly parse string in positive timezone', () => {
        const sample = IRTZonedDateTime.fromJSON('2000-02-01T10:11:12.345+07:10');
        console.log(`Zoned: ${JSON.stringify(sample.offset, undefined, 2)}`);
        expect(sample.year).toBe(2000);
        expect(sample.month).toBe(1);
        expect(sample.date).toBe(1);
        expect(sample.hours).toBe(10);
        expect(sample.minutes).toBe(11);
        expect(sample.seconds).toBe(12);
        expect(sample.millis).toBe(345);
    });

    it('Can properly parse string in negative timezone', () => {
        const sample = IRTZonedDateTime.fromJSON('2000-02-01T10:11:12.345-07:10');
        console.log(`Zoned: ${JSON.stringify(sample.offset, undefined, 2)}`);
        expect(sample.year).toBe(2000);
        expect(sample.month).toBe(1);
        expect(sample.date).toBe(1);
        expect(sample.hours).toBe(10);
        expect(sample.minutes).toBe(11);
        expect(sample.seconds).toBe(12);
        expect(sample.millis).toBe(345);
    });

    it('Can preserve nanos during serialization to and from JSON', () => {
        const sample = IRTZonedDateTime.fromJSON('2000-02-01T10:11:12.3456789+07:00');
        expect(sample.toJSON()).toBe('2000-02-01T10:11:12.3456789+07:00');
        const sample2 = IRTZonedDateTime.fromJSON('2000-02-01T10:11:12.3456789-07:00');
        expect(sample2.toJSON()).toBe('2000-02-01T10:11:12.3456789-07:00');
    });
});

describe('IRTUniversalDateTime', () => {
    it('Can consistently serialize to and from JSON', () => {
        const sample = new IRTUniversalDateTime();
        const json = sample.toJSON();
        console.log(JSON.stringify(sample, undefined, 2));
        const sample2 = IRTUniversalDateTime.fromJSON(json);
        const json2 = sample2.toJSON();
        expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
    });

    it('Can properly parse string', () => {
        const sample = IRTUniversalDateTime.fromJSON('2000-02-01T10:11:12.345Z');
        expect(sample.year).toBe(2000);
        expect(sample.month).toBe(1);
        expect(sample.date).toBe(1);
        expect(sample.hours).toBe(10);
        expect(sample.minutes).toBe(11);
        expect(sample.seconds).toBe(12);
        expect(sample.millis).toBe(345);
    });

    it('Can preserve nanos during serialization to and from JSON', () => {
        const sample = IRTUniversalDateTime.fromJSON('2000-02-01T10:11:12.3456789Z');
        expect(sample.toJSON()).toBe('2000-02-01T10:11:12.3456789Z');
    });
});