
import {
    IRTDate
} from '../date';

describe('IRTDate', () => {
    it('Can serialize to JSON', () => {
        const sample = new IRTDate();
        expect(() => sample.toJSON()).not.toThrow();
    });

    it('Can deserialize from JSON', () => {
        const sample = new IRTDate();
        const json = sample.toJSON();
        expect(() => IRTDate.fromJSON(json)).not.toThrow();
    });

    it('Can consistently serialize JSON', () => {
        const sample = new IRTDate();
        const json = sample.toJSON();
        const sample2 = IRTDate.fromJSON(json);
        const json2 = sample2.toJSON();
        expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
    });

    it('Can properly parse string', () => {
        const sample = IRTDate.fromJSON('2000-02-01');
        expect(sample.year).toBe(2000);
        expect(sample.month).toBe(1);
        expect(sample.date).toBe(1);
    });

    it('Can properly output string', () => {
        const sample = IRTDate.fromJSON('2000-02-01');
        expect(sample.toJSON()).toBe('2000-02-01');
    });

    it('Fails on invalid string', () => {
        expect(() => IRTDate.fromJSON('2000_02_01')).toThrow();
    });
});