
import {
    IRTTime
} from '../time';

describe('IRTTime', () => {
    it('Can serialize to JSON', () => {
        const sample = new IRTTime();
        expect(() => sample.toJSON()).not.toThrow();
    });

    it('Can deserialize from JSON', () => {
        const sample = new IRTTime();
        const json = sample.toJSON();
        expect(() => IRTTime.fromJSON(json)).not.toThrow();
    });

    it('Can consistently serialize JSON', () => {
        const sample = new IRTTime();
        const json = sample.toJSON();
        const sample2 = IRTTime.fromJSON(json);
        const json2 = sample2.toJSON();
        expect(JSON.stringify(json2)).toBe(JSON.stringify(json));
    });

    it('Can properly parse string', () => {
        const sample = IRTTime.fromJSON('10:11:12.134');
        expect(sample.hours).toBe(10);
        expect(sample.minutes).toBe(11);
        expect(sample.seconds).toBe(12);
        expect(sample.millis).toBe(134);
    });

    it('Can properly output string', () => {
        const sample = IRTTime.fromJSON('10:11:12.134');
        expect(sample.toJSON()).toBe('10:11:12.134');
    });

    it('Can properly output string 2', () => {
        const sample = IRTTime.fromJSON('10:11:12.34');
        expect(sample.toJSON()).toBe('10:11:12.34');
    });

    it('Fails on invalid string', () => {
        expect(() => IRTTime.fromJSON('10-11:70.134')).toThrow();
    });
});