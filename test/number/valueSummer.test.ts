import { describe, it, expect } from '@jest/globals';
import { Value } from "../../src/value";
import { ValueSummer } from "../../src/index";

describe('Summing Value', function () {
    describe('Initial value', function () {
        it('Can be initialized without arguments', function () {
            new ValueSummer();
        });
        it('Can be initialized with single Value', function () {
            new ValueSummer([new Value(1)]);
        });
        it('Can be initialized with multiple Values', function () {
            new ValueSummer([new Value(1), new Value(2), new Value(3)]);
        });
        it('Can be initialized with just read function', function () {
            new ValueSummer(undefined);
        });
        it('Can be initialized with just write function', function () {
            new ValueSummer(undefined);
        });
    });

    describe('Getting value', function () {
        it('Getting value from ValueSummer with no Values', function () {
            let multi = new ValueSummer();
            expect(multi.get).toStrictEqual(undefined);
        });
        it('Getting value from ValueSummer', function () {
            let val = 1;
            let multi = new ValueSummer([new Value(val), new Value(99)]);
            expect(multi.get).toStrictEqual(100);
        });
    });

    describe('Setting value', function () {
        it('Setting value on ValueSummer with no Values', function () {
            let multi = new ValueSummer();
            multi.set = 10;
        });
        it('Setting value on ValueSummer', function () {
            let value1 = new Value(1);
            let value2 = new Value(2);
            let multi = new ValueSummer([value1, value2]);
            multi.set = 10;
            expect(value1.get).toStrictEqual(4.5);
            expect(value2.get).toStrictEqual(5.5);
        });
    });

    describe('Listeners', function () {
        it('Listener should return sum of values', function (done) {
            let values = [new Value(1), new Value(2), new Value(3)];
            let multi = new ValueSummer(values);
            multi.addListener((val) => {
                expect(val).toStrictEqual(9);
                done();
            });
            values[0].set = 2;
            values[1].set = 3;
            values[2].set = 4;
        });
    });
});