import { describe, it, expect } from '@jest/globals';
import { Value } from "../../src/value";
import { ValueObjectKeyProxy } from "../../src/index";

describe('Object Key Proxy Value', function () {
    describe('Initialize Value', function () {
        it('Proxy set to empty object has undefined value', function () {
            let value = new Value({});
            let key = new ValueObjectKeyProxy('test', value);
            expect(key.get).toStrictEqual(undefined);
        });
        it('Proxy set to object with boolean value has boolean value', function () {
            let value = new Value({ test: true });
            let key = new ValueObjectKeyProxy('test', value);
            expect(key.get).toStrictEqual(true);
        });
    });

    describe('Object change value', function () {
        it('Proxy set to object with value changed will get value changed', function () {
            let value = new Value({});
            let key = new ValueObjectKeyProxy<number, { test: number } | {}>('test', value);
            expect(key.get).toStrictEqual(undefined);
            value.set = { test: 1 };
            expect(key.get).toStrictEqual(1);
        });
    });

    describe('Modifying', function () {
        it('Proxy set to object then setting the value of the key', function () {
            let value = new Value({});
            let key = new ValueObjectKeyProxy<number, { test: number } | {}>('test', value);
            key.set = 1;
            expect(value.get).toEqual({ test: 1 });
        });
        it('Original value object has event', function (done) {
            let value = new Value({});
            value.addListener(() => {
                done();
            });
            let key = new ValueObjectKeyProxy<number, { test: number } | {}>('test', value);
            key.set = 1;
        });
    });

    describe('Listeners', function () {
        it('Proxy with listener when object is changed', function (done) {
            let value = new Value({});
            let key = new ValueObjectKeyProxy<number, { test: number } | {}>('test', value);
            key.addListener((val) => {
                expect(val).toStrictEqual(1);
                done();
            })
            value.set = { test: 1 };
        });
    });
});