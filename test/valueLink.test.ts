import { describe, it, expect } from '@jest/globals';
import { Value } from "../src/value";
import { ValueLink } from "../src/index";

describe('Link Value', function () {
    describe('Initial value', function () {
        it('Can be initialized without arguments', function () {
            new ValueLink();
        });
        it('Can be initialized with multiple Values', function () {
            new ValueLink([new Value(1), new Value(2), new Value(3)]);
        });
        it('Can be initialized with multiple Values of different types function', function () {
            new ValueLink([new Value<boolean | number | string>(true), new Value<boolean | number | string>(2), new Value<boolean | number | string>('3')]);
        });
    });

    describe('Linking values', function () {
        it('Linking initialized values', function () {
            let values = [new Value(1), new Value(2), new Value(3)];
            let link = new ValueLink(values);
            link.link();
            expect(values[0].inUse).toStrictEqual(true);
            expect(values[0].get).toStrictEqual(1);
            expect(values[1].inUse).toStrictEqual(true);
            expect(values[1].get).toStrictEqual(1);
            expect(values[2].inUse).toStrictEqual(true);
            expect(values[2].get).toStrictEqual(1);
        });
        it('Linking initialized values then changing value', function () {
            let values = [new Value(1), new Value(2), new Value(3)];
            let link = new ValueLink(values);
            link.link();
            expect(values[0].get).toStrictEqual(1);
            expect(values[1].get).toStrictEqual(1);
            expect(values[2].get).toStrictEqual(1);
            values[0].set = 2
            expect(values[0].get).toStrictEqual(2);
            expect(values[1].get).toStrictEqual(2);
            expect(values[2].get).toStrictEqual(2);
            values[1].set = 3
            expect(values[0].get).toStrictEqual(3);
            expect(values[1].get).toStrictEqual(3);
            expect(values[2].get).toStrictEqual(3);
            values[2].set = 4
            expect(values[0].get).toStrictEqual(4);
            expect(values[1].get).toStrictEqual(4);
            expect(values[2].get).toStrictEqual(4);
        });
        it('Linking then unlinking values', function () {
            let values = [new Value(1), new Value(2), new Value(3)];
            let link = new ValueLink(values);
            link.link();
            expect(values[0].inUse).toStrictEqual(true);
            expect(values[1].inUse).toStrictEqual(true);
            expect(values[2].inUse).toStrictEqual(true);
            link.unlink();
            expect(values[0].inUse).toStrictEqual(false);
            expect(values[1].inUse).toStrictEqual(false);
            expect(values[2].inUse).toStrictEqual(false);
        });
        it('Linking initialized values with link set to true', function () {
            let values = [new Value(1), new Value(2), new Value(3)];
            let link = new ValueLink(values, true);
            expect(values[0].inUse).toStrictEqual(true);
            expect(values[0].get).toStrictEqual(1);
            expect(values[1].inUse).toStrictEqual(true);
            expect(values[1].get).toStrictEqual(1);
            expect(values[2].inUse).toStrictEqual(true);
            expect(values[2].get).toStrictEqual(1);
        });
        it('Linking initialized values then setting values to undefined', function () {
            let values = [new Value(1), new Value(2), new Value(3)];
            let link = new ValueLink(values, true);
            expect(values[0].inUse).toStrictEqual(true);
            expect(values[0].get).toStrictEqual(1);
            expect(values[1].inUse).toStrictEqual(true);
            expect(values[1].get).toStrictEqual(1);
            expect(values[2].inUse).toStrictEqual(true);
            expect(values[2].get).toStrictEqual(1);
            link.values();
            expect(values[0].inUse).toStrictEqual(false);
            expect(values[1].inUse).toStrictEqual(false);
            expect(values[2].inUse).toStrictEqual(false);
        });
    });
});