import { describe, it, expect } from '@jest/globals';
import { ValueLimited } from "../src/index";

describe('Limited Value', function () {
    describe('Initial valueLimiter should not limit initial value', function () {
        it('Should have an initial value of null', function () {
            expect((new ValueLimited(null, (val) => { return undefined })).get).toStrictEqual(null);
        });
        it('Should have an initial value of true', function () {
            expect((new ValueLimited(true, (val) => { return false })).get).toStrictEqual(true);
        });
        it('Should have an initial value of 1', function () {
            expect((new ValueLimited(1, (val) => { return 2 })).get).toStrictEqual(1);
        });
        it('Should have an initial value of "test"', function () {
            expect((new ValueLimited('test', (val) => { return 'cool' })).get).toStrictEqual('test');
        });
        it('Should have an initial value type of an object', function () {
            expect(typeof (new ValueLimited<{} | boolean>({}, (val) => { return true })).get).toStrictEqual('object');
        });
        it('Should have an initial value type of an array', function () {
            expect((new ValueLimited<[] | boolean>([], (val) => { return true })).get).toBeInstanceOf(Array);
        });
    });

    describe('Value limiter', function () {
        it('Limiter which changes values', function () {
            let value = new ValueLimited(1, (val) => {
                switch (typeof val) {
                    case 'number':
                        return val * 2
                }
            });
            value.set = 10;
            expect(value.get).toStrictEqual(20);
        });
        it('Limiter which denies values', function () {
            let value = new ValueLimited(1, (val) => { return (val === 10 ? undefined : val) });
            value.set = 20;
            expect(value.get).toStrictEqual(20);
            value.set = 10;
            expect(value.get).toStrictEqual(20);
        });
    });
});