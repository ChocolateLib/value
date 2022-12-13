import { describe, it, expect } from '@jest/globals';
import { ValueLimitedString } from "../../src";

describe('Limited Number Value', function () {
    describe('Initial valueLimiter should not limit initial value', function () {
        it('Should have an initial value of 0', function () {
            expect((new ValueLimitedString('0')).get).toStrictEqual('0');
        });
    });

    describe('Limiting', function () {
        it('Max length is accessible', function () {
            expect((new ValueLimitedString('asdf', 10)).maxLength).toStrictEqual(10);
        });
        it('Max byte length is accessible', function () {
            expect((new ValueLimitedString('asdf', undefined, 22)).maxByteLength).toStrictEqual(22);
        });
        it('Allowed list is accessible', function () {
            expect((new ValueLimitedString('asdf', undefined, undefined, ['test1', 'test2'])).allowed).toBe(['test1', 'test2']);
        });
    })


    // describe('Limiting', function () {
    //     it('None limited number', function () {
    //         let value = new ValueLimitedString(5);
    //         expect(value.get).toStrictEqual(5);
    //         value.set = 100;
    //         expect(value.get).toStrictEqual(100);
    //         value.set = -100;
    //         expect(value.get).toStrictEqual(-100);
    //     });
    //     it('Limiter to numbers between 2 and 8', function () {
    //         let value = new ValueLimitedString(5, 2, 8);
    //         expect(value.get).toStrictEqual(5);
    //         value.set = 10;
    //         expect(value.get).toStrictEqual(8);
    //         value.set = 0;
    //         expect(value.get).toStrictEqual(2);
    //     });
    //     it('Limiter to steps of 3', function () {
    //         let value = new ValueLimitedString(5, undefined, undefined, 3);
    //         expect(value.get).toStrictEqual(5);
    //         value.set = 10;
    //         expect(value.get).toStrictEqual(9);
    //         value.set = 0;
    //         expect(value.get).toStrictEqual(0);
    //     });
    //     it('Limiter to steps of 3 and between 5 and 44', function () {
    //         let value = new ValueLimitedString(5, 5, 44, 3);
    //         expect(value.get).toStrictEqual(5);
    //         value.set = 2;
    //         expect(value.get).toStrictEqual(5);
    //         value.set = 40;
    //         expect(value.get).toStrictEqual(39);
    //     });
    // });

    // describe('Change limits', function () {
    //     it('Minimum is changed', function () {
    //         let value = new ValueLimitedString(20, 5, 600, 3);
    //         expect(value.get).toStrictEqual(20);
    //         value.min = 38;
    //         expect(value.get).toStrictEqual(38);
    //     });
    //     it('Maximum is changed', function () {
    //         let value = new ValueLimitedString(500, 5, 600, 3);
    //         expect(value.get).toStrictEqual(500);
    //         value.max = 357;
    //         expect(value.get).toStrictEqual(357);
    //     });
    //     it('Step size is set', function () {
    //         let value = new ValueLimitedString(20, 5, 600);
    //         expect(value.get).toStrictEqual(20);
    //         value.step = 7;
    //         expect(value.get).toStrictEqual(21);
    //     });
    //     it('Step size is changed', function () {
    //         let value = new ValueLimitedString(21, 5, 600, 7);
    //         expect(value.get).toStrictEqual(21);
    //         value.step = 8;
    //         expect(value.get).toStrictEqual(24);
    //     });
    //     it('Step size is removed', function () {
    //         let value = new ValueLimitedString(21, 5, 600, 7);
    //         expect(value.get).toStrictEqual(21);
    //         value.step = undefined;
    //         value.set = 23;
    //         expect(value.get).toStrictEqual(23);
    //     });
    // });
});