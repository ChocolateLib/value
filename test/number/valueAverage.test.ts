import { describe, it, expect } from '@jest/globals';
import { Value } from "../../src/value";
import { ValueAverage } from "../../src/index";

describe('Averaging Value', function () {
    describe('Initial value', function () {
        it('Can be initialized without arguments', function () {
            new ValueAverage();
        });
        it('Can be initialized with single Value', function () {
            new ValueAverage([new Value(1)]);
        });
        it('Can be initialized with multiple Values', function () {
            new ValueAverage([new Value(1), new Value(2), new Value(3)]);
        });
        it('Can be initialized with just read function', function () {
            new ValueAverage(undefined);
        });
        it('Can be initialized with just write function', function () {
            new ValueAverage(undefined);
        });
    });

    describe('Getting value', function () {
        it('Getting value from ValueAverage with no Values', function () {
            let multi = new ValueAverage();
            expect(multi.get).toStrictEqual(undefined);
        });
        it('Getting value from ValueAverage with Value but without setting a function just returns the value of the first Value', function () {
            let val = 1;
            let multi = new ValueAverage([new Value(val), new Value(99)]);
            expect(multi.get).toStrictEqual(50);
        });
    });

    describe('Setting value', function () {
        it('Setting value on ValueAverage with no Values', function () {
            let multi = new ValueAverage();
            multi.set = 10;
        });
        it('Setting value on ValueAverage', function () {
            let value1 = new Value(1);
            let value2 = new Value(2);
            let multi = new ValueAverage([value1, value2]);
            multi.set = 10;
            expect(value1.get).toStrictEqual(9.5);
            expect(value2.get).toStrictEqual(10.5);
        });
    });

    describe('Listeners', function () {
        it('Listener should return average of values', function (done) {
            let values = [new Value(1), new Value(2), new Value(3)];
            let multi = new ValueAverage(values);
            multi.addListener((val) => {
                expect(val).toStrictEqual(3);
                done();
            });
            values[0].set = 2;
            values[1].set = 3;
            values[2].set = 4;
        });
    });
});