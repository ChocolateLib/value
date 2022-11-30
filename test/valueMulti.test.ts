import { describe, it, expect } from '@jest/globals';
import { Value } from "../src/value";
import { ValueMulti } from "../src/index";

describe('Multi Value', function () {
    describe('Initial value', function () {
        it('Can be initialized without arguments', function () {
            new ValueMulti();
        });
        it('Can be initialized with single Value', function () {
            new ValueMulti([new Value(1)]);
        });
        it('Can be initialized with multiple Values', function () {
            new ValueMulti([new Value(1), new Value(2), new Value(3)]);
        });
        it('Can be initialized with just read function', function () {
            new ValueMulti(undefined, (val) => { });
        });
        it('Can be initialized with just write function', function () {
            new ValueMulti(undefined, undefined, (val) => { });
        });
    });

    describe('Getting value', function () {
        it('Getting value from ValueMulti with no Values', function () {
            let multi = new ValueMulti();
            expect(multi.get).toStrictEqual(undefined);
        });
        it('Getting value from ValueMulti with Value but without setting a function just returns the value of the first Value', function () {
            let val = 1;
            let multi = new ValueMulti([new Value(val), new Value(99)]);
            expect(multi.get).toStrictEqual(val);
        });
        it('Getting value from ValueMulti with Value with read function set', function () {
            let multi = new ValueMulti([new Value(5), new Value(5)], ([a, b]) => { return a * b });
            expect(multi.get).toStrictEqual(25);
        });
    });

    describe('Setting value', function () {
        it('Setting value on ValueMulti with no Values', function () {
            let multi = new ValueMulti();
            multi.set = 10;
        });
        it('Setting value on ValueMulti with Value but without setting a function just sets all Values to the value', function () {
            let value1 = new Value(1);
            let value2 = new Value(2);
            let multi = new ValueMulti([value1, value2]);
            multi.set = 10;
            expect(value1.get).toStrictEqual(10);
            expect(value2.get).toStrictEqual(10);
        });
        it('Setting value from ValueMulti with Value with write function set', function () {
            let val1 = new Value(5);
            let val2 = new Value(5);
            let multi = new ValueMulti<number, number>([val1, val2], undefined, (a, b, c) => {
                b[0] = a * 20;
                b[1] = a * 10;
            });
            multi.set = 3;
            expect(val1.get).toStrictEqual(60);
            expect(val2.get).toStrictEqual(30);
        });
    });

    describe('Listeners', function () {
        it('If a listener is added to a ValueMulti, it start listening to all Values', function () {
            let values = [new Value(1), new Value(2), new Value(3)];
            let multi = new ValueMulti(values);
            multi.addListener(() => { });
            expect(values[0].inUse).toStrictEqual(true);
            expect(values[1].inUse).toStrictEqual(true);
            expect(values[2].inUse).toStrictEqual(true);
        });
        it('If a listener is added to a ValueMulti, it start listening to all Values', function (done) {
            let values = [new Value(1), new Value(2), new Value(3)];
            let multi = new ValueMulti(values);
            multi.addListener((val) => {
                expect(val).toStrictEqual(2);
                done();
            });
            values[0].set = 2;
            values[1].set = 3;
            values[2].set = 4;
        });
        it('If a listener is added to a ValueMulti then removed, the Values should not have listeners', function () {
            let values = [new Value(1), new Value(2), new Value(3)];
            let multi = new ValueMulti(values);
            let func = multi.addListener(() => { });
            multi.removeListener(func);
            expect(values[0].inUse).toStrictEqual(false);
            expect(values[1].inUse).toStrictEqual(false);
            expect(values[2].inUse).toStrictEqual(false);
        });
    });

    describe('Error Angles', function () {
        it('If an array is passed to the ValueMulti, and the array is modified, the ValueMulti shall not be affected', function () {
            let values = [new Value(1), new Value(2), new Value(3)];
            let multi = new ValueMulti(values);
            expect(multi.get).toStrictEqual(1);
            values.unshift(new Value(4));
            expect(multi.get).toStrictEqual(1);
        });
    });
});