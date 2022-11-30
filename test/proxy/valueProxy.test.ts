import { describe, it, expect } from '@jest/globals';
import { Value } from "../../src/value";
import { ValueProxy } from "../../src/index";

describe('Proxy Value', function () {
    describe('Initialize Value proxy', function () {
        it('Proxy without Value should have value undefined', function () {
            expect((new ValueProxy()).get).toStrictEqual(undefined);
        });
    });
    describe('Initialize value proxy with Value', function () {
        it('Proxy linked to Value with undefined value should have value undefined', function () {
            let value = new Value(undefined);
            expect((new ValueProxy(value)).get).toStrictEqual(undefined);
        });
        it('Proxy linked to Value with null value should have value null', function () {
            let value = new Value(null);
            expect((new ValueProxy(value)).get).toStrictEqual(null);
        });
        it('Proxy linked to Value with boolean value should have boolean value', function () {
            let value = new Value(true);
            expect((new ValueProxy(value)).get).toStrictEqual(true);
        });
        it('Proxy linked to Value with number value should have number value', function () {
            let value = new Value(1);
            expect((new ValueProxy(value)).get).toStrictEqual(1);
        });
        it('Proxy linked to Value with string value should have string value', function () {
            let value = new Value('asdf');
            expect((new ValueProxy(value)).get).toStrictEqual('asdf');
        });
        it('Proxy linked to Value with object value should have object value', function () {
            let value = new Value({});
            expect(typeof (new ValueProxy(value)).get).toStrictEqual('object');
        });
        it('Proxy linked to Value with array value should have array value', function () {
            let value = new Value([]);
            expect((new ValueProxy(value)).get).toBeInstanceOf(Array);
        });
    });

    describe('Initialize value proxy without proxy Value then adding listeners', function () {
        it('Adding listener to ValueProxy without proxy works', function () {
            let valueProxy = new ValueProxy();
            valueProxy.addListener((val) => { });
            expect(valueProxy.inUse).toBeTruthy();
        });
        it('Adding listener with run set true to ValueProxy without proxy runs listener with value undefined', function () {
            let valueProxy = new ValueProxy();
            valueProxy.addListener((val) => {
                expect(val).toStrictEqual(undefined);
            }, true);
        });
    });

    describe('Initialize value proxy with proxy Value then adding listeners', function () {
        it('Adding listener with run set true to ValueProxy with proxy with initial value null runs listener with value null', function () {
            let value = new Value(null);
            let valueProxy = new ValueProxy(value);
            valueProxy.addListener((val) => {
                expect(val).toStrictEqual(null);
            }, true);
        });
        it('Adding listener with run set true to ValueProxy with proxy with initial boolean value runs listener with boolean value', function () {
            let init = true;
            let value = new Value(init);
            let valueProxy = new ValueProxy(value);
            valueProxy.addListener((val) => {
                expect(val).toStrictEqual(init);
            }, true);
        });
        it('Adding listener with run set true to ValueProxy with proxy with initial number value undefined runs listener with number value', function () {
            let init = 1;
            let value = new Value(init);
            let valueProxy = new ValueProxy(value);
            valueProxy.addListener((val) => {
                expect(val).toStrictEqual(init);
            }, true);
        });
        it('Adding listener with run set true to ValueProxy with proxy with initial string value runs listener with string value', function () {
            let init = 'true';
            let value = new Value(init);
            let valueProxy = new ValueProxy(value);
            valueProxy.addListener((val) => {
                expect(val).toStrictEqual(init);
            }, true);
        });
        it('Adding listener with run set true to ValueProxy with proxy with initial object value runs listener with object value', function () {
            let value = new Value({});
            let valueProxy = new ValueProxy(value);
            valueProxy.addListener((val) => {
                expect(typeof val).toStrictEqual('object');
            }, true);
        });
        it('Adding listener with run set true to ValueProxy with proxy with array value undefined runs listener with array value', function () {
            let value = new Value([]);
            let valueProxy = new ValueProxy(value);
            valueProxy.addListener((val) => {
                expect(val).toBeInstanceOf(Array);
            }, true);
        });
    });

    describe('Initialize value proxy without proxy Value then adding listeners then setting proxy with different values', function () {
        it('Adding proxy to ValueProxy with listener does nothing', function () {
            let valueProxy = new ValueProxy<undefined, undefined>();
            valueProxy.addListener((val) => {
                throw new Error('This shouldn\'t happen');
            });
            valueProxy.proxy = new Value(undefined);
        });
        it('Adding proxy with initial boolean value to ValueProxy with listener', function (done) {
            let init = true;
            let valueProxy = new ValueProxy<boolean, boolean>();
            valueProxy.addListener((val) => {
                expect(val).toStrictEqual(init);
                done();
            });
            valueProxy.proxy = new Value(init);
        });
        it('Adding proxy with initial number value to ValueProxy with listener', function (done) {
            let init = 1;
            let valueProxy = new ValueProxy<number, number>();
            valueProxy.addListener((val) => {
                expect(val).toStrictEqual(init);
                done();
            });
            valueProxy.proxy = new Value(init);
        });
        it('Adding proxy with initial string value to ValueProxy with listener', function (done) {
            let init = 'true';
            let valueProxy = new ValueProxy<string, string>();
            valueProxy.addListener((val) => {
                expect(val).toStrictEqual(init);
                done();
            });
            valueProxy.proxy = new Value(init);
        });
        it('Adding proxy with initial object value to ValueProxy with listener', function (done) {
            let init = {};
            let valueProxy = new ValueProxy<object, object>();
            valueProxy.addListener((val) => {
                expect(typeof val).toStrictEqual('object');
                done();
            });
            valueProxy.proxy = new Value(init);
        });
        it('Adding proxy with initial array value to ValueProxy with listener', function (done) {
            let init = [1];
            let valueProxy = new ValueProxy<Array<number>, Array<number>>();
            valueProxy.addListener((val) => {
                expect(val).toBeInstanceOf(Array);
                done();
            });
            valueProxy.proxy = new Value(init);
        });
    });

    describe('Changing proxy of ValueProxy with proxy', function () {
        it('Adding proxy to ValueProxy with listener', function (done) {
            let valueProxy = new ValueProxy(new Value(1));
            valueProxy.addListener((val) => {
                expect(val).toStrictEqual(2);
                done();
            });
            valueProxy.proxy = new Value(2);
        });
        it('Adding proxy to ValueProxy with listener', function (done) {
            let valueProxy = new ValueProxy(new Value(1));
            let prog = 0;
            valueProxy.addListener((val) => {
                prog++;
                if (prog == 1) {
                    expect(val).toStrictEqual(2);
                }
                if (prog == 2) {
                    expect(val).toStrictEqual(3);
                    done();
                }
            });
            valueProxy.proxy = new Value(2);
            valueProxy.proxy = new Value(3);
        });
    });
});