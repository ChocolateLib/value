import { describe, it, expect } from '@jest/globals';
import { Value } from "../src/index";

describe('Value', function () {

    describe('Initial value', function () {
        it('Should have an initial value of null', function () {
            expect((new Value(null)).get).toStrictEqual(null);
        });
        it('Should have an initial value of true', function () {
            expect((new Value(true)).get).toStrictEqual(true);
        });
        it('Should have an initial value of 1', function () {
            expect((new Value(1)).get).toStrictEqual(1);
        });
        it('Should have an initial value of "test"', function () {
            expect((new Value('test')).get).toStrictEqual('test');
        });
        it('Should have an initial value type of an object', function () {
            expect(typeof (new Value({})).get).toEqual('object');
        });
        it('Should have an initial value type of an array', function () {
            expect((new Value([])).get).toBeInstanceOf(Array);
        });
    });

    describe('Setting value', function () {
        it('Setting value to true', function () {
            let value = new Value(false);
            value.set = true;
            expect(value.get).toStrictEqual(true);
        });
        it('Setting value to 1', function () {
            let value = new Value(0);
            value.set = 1;
            expect(value.get).toStrictEqual(1);
        });
        it('Setting value to "test"', function () {
            let value = new Value('');
            value.set = 'test';
            expect(value.get).toStrictEqual('test');
        });
        it('Setting value to an object', function () {
            let value = new Value<number | {}>(0);
            value.set = {};
            expect(typeof value.get).toBe('object');
        });
        it('Setting value to an array', function () {
            let value = new Value<number | {}>(0);
            value.set = [];
            expect(value.get).toBeInstanceOf(Array);
        });
    });

    describe('Getting value', function () {
        it('Getting value with null value', function () { expect((new Value(null)).get).toStrictEqual(null); });
        it('Setting value to true', function () { expect((new Value(true)).get).toStrictEqual(true); });
        it('Setting value to 1', function () { expect((new Value(1)).get).toStrictEqual(1); });
        it('Setting value to "test"', function () { expect((new Value('test')).get).toStrictEqual('test'); });
        it('Setting value to an object', function () { expect(typeof (new Value({})).get).toEqual('object'); });
        it('Setting value to an array', function () { expect((new Value([])).get).toBeInstanceOf(Array); });
    });

    describe('Adding and removing listener', function () {
        it('Add one listener correctly', function () {
            let value = new Value(0);
            let listener1 = value.addListener(() => { });
            expect(value.inUse).toBeTruthy();
            expect(value.hasListener(listener1)).toBeTruthy();
        });
        it('Add two listeners correctly', function () {
            let value = new Value(0);
            let listener1 = value.addListener(() => { });
            let listener2 = value.addListener(() => { });
            expect(value.inUse).toBeTruthy();
            expect(value.hasListener(listener1)).toBeTruthy();
            expect(value.hasListener(listener2)).toBeTruthy();
        });
        it('Insert two listeners then remove first listners correctly', function () {
            let value = new Value(0);
            let listener1 = value.addListener(() => { });
            let listener2 = value.addListener(() => { });
            value.removeListener(listener1);
            expect(value.inUse).toBeTruthy();
            expect(value.hasListener(listener1)).toBeFalsy();
            expect(value.hasListener(listener2)).toBeTruthy();
        });
        it('Insert two listeners then removeing both listners correctly', function () {
            let value = new Value(0);
            let listener1 = value.addListener(() => { });
            let listener2 = value.addListener(() => { });
            value.removeListener(listener1);
            value.removeListener(listener2);
            expect(value.inUse).toBeFalsy();
            expect(value.hasListener(listener1)).toBeFalsy();
            expect(value.hasListener(listener2)).toBeFalsy();
        });
    });

    describe('Value change with listeners', function () {
        it('One listener', function (done) {
            let value = new Value(0);
            value.addListener((val) => { if (val === 10) { done() } else { done(new Error('Unexpected value')) } });
            value.set = 10;
        });
        it('Multiple listener', function () {
            let value = new Value(0);
            let proms = Promise.all([
                new Promise((a) => { value.addListener((val) => { a(0) }) }),
                new Promise((a) => { value.addListener((val) => { a(0) }) }),
                new Promise((a) => { value.addListener((val) => { a(0) }) }),
            ])
            value.set = 10;
            return proms;
        });
        it('Listener with exception', function () {
            let value = new Value(0);
            value.addListener((val) => { throw false });
            value.set = 10;
        });
    });

    describe('Adding listeners with initial run', function () {
        it('Add one listener correctly', function (done) {
            let value = new Value(1);
            value.addListener((val) => { if (val === 1) { done(); } else { done(new Error('Value incorrect')) } }, true);
        });
        it('Add multiple listeners correctly', function () {
            let value = new Value(1);
            let proms = Promise.all([
                new Promise((a) => { value.addListener((val) => { if (val === 1) { a(0); } }, true) }),
                new Promise((a) => { value.addListener((val) => { if (val === 1) { a(0); } }, true) }),
                new Promise((a) => { value.addListener((val) => { if (val === 1) { a(0); } }, true) }),
            ])
            return proms;
        });
    });

    describe('Methods and properties', function () {
        it('hasListener', function () {
            let value = new Value(10);
            expect(value.inUse).toStrictEqual(false);
            value.addListener(() => { });
            expect(value.inUse).toStrictEqual(true);
        });
        it('Compare same type', function () {
            let value = new Value(10);
            expect(value.compare(10)).toStrictEqual(false);
            expect(value.compare(11)).toStrictEqual(true);
        });
        it('Compare different type', function () {
            let value = new Value(10);
            expect(value.compare('10')).toStrictEqual(true);
            expect(value.compare('11')).toStrictEqual(true);
        });
        it('JSON override', function () {
            let value = new Value(10);
            expect(JSON.stringify(value)).toStrictEqual('10');
        });
        it('Info about value', function () {
            let value = new Value(10);
            value.info = { name: 'Test' };
            expect(value.info).toStrictEqual({ name: 'Test' });
            value.info = { name: 'Test', description: 'TestDesc' };
            expect(value.info).toStrictEqual({ name: 'Test', description: 'TestDesc' });
        });
    });

    class ValueTest<ValueType> extends Value<ValueType> {
        /** This gets the current value*/
        get get(): ValueType | Promise<ValueType> {
            return new Promise((a) => {
                setTimeout(() => {
                    a(this.___value);
                }, 10);
            })
        }
    }

    describe('Value with async getter', function () {
        it('Value with async getter', function (done) {
            let value = new ValueTest(10);
            let val = value.get;
            if (val instanceof Promise) {
                val.then((val) => {
                    expect(val).toStrictEqual(10);
                    done();
                })
            }
        });
    });
});