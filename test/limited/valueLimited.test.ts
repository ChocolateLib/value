import { describe, it, expect } from '@jest/globals';
import { ValueLimited } from "../../src/index";

describe('Limited Value', function () {
    describe('Initial valueLimiter should not limit initial value', function () {
        it('Should have an initial value of null', function () {
            expect((new ValueLimited(null, [{ func(val) { return false }, reason: '' }])).get).toStrictEqual(null);
        });
        it('Should have an initial value of true', function () {
            expect((new ValueLimited(true, [{ func(val) { return false }, reason: '' }])).get).toStrictEqual(true);
        });
        it('Should have an initial value of 1', function () {
            expect((new ValueLimited(1, [{ func(val) { return false }, reason: '' }])).get).toStrictEqual(1);
        });
        it('Should have an initial value of "test"', function () {
            expect((new ValueLimited('test', [{ func(val) { return false }, reason: '' }])).get).toStrictEqual('test');
        });
        it('Should have an initial value type of an object', function () {
            expect(typeof (new ValueLimited<{} | boolean>({}, [{ func(val) { return false }, reason: '' }])).get).toStrictEqual('object');
        });
        it('Should have an initial value type of an array', function () {
            expect((new ValueLimited<[] | boolean>([], [{ func(val) { return false }, reason: '' }])).get).toBeInstanceOf(Array);
        });
    });

    describe('Value limiter', function () {
        it('Single limiter', function () {
            let value = new ValueLimited(1, [{ func(val) { return val === 10 }, reason: 'Not valid' }]);
            value.set = 2;
            expect(value.get).toStrictEqual(2);
            value.set = 10;
            expect(value.get).toStrictEqual(2);
            expect(value.checkLimitReason(10)).toStrictEqual('Not valid');
        });
        it('Multiple limiter', function () {
            let value = new ValueLimited(1, [{ func(val) { return val === 10 }, reason: 'Ten' }, { func(val) { return val === 16 }, reason: 'Sixteen' }]);
            value.set = 3;
            expect(value.get).toStrictEqual(3);
            value.set = 10;
            expect(value.get).toStrictEqual(3);
            expect(value.checkLimitReason(10)).toStrictEqual('Ten');
            value.set = 16;
            expect(value.get).toStrictEqual(3);
            expect(value.checkLimitReason(16)).toStrictEqual('Sixteen');
        });
    });
});