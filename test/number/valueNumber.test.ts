import { describe, it, expect } from '@jest/globals';
import { ValueNumber } from "../../src/index";

describe('Number Value', function () {
    describe('Initial value', function () {
        it('Should have an initial value of NaN', function () { expect((new ValueNumber(NaN)).get).toBeNaN(); });
        it('Should have an initial value of 1', function () { expect((new ValueNumber(1)).get).toStrictEqual(1); });
        it('Should have an initial value of +Infinity', function () { expect((new ValueNumber(+Infinity)).get).toStrictEqual(+Infinity); });
        it('Should have an initial value of -Infinity', function () { expect((new ValueNumber(-Infinity)).get).toStrictEqual(-Infinity); });
    });

    describe('Modifier', function () {
        it('Plus Equals with fixed value', function () {
            let value = new ValueNumber(0);
            value.plusEquals(10);
            expect(value.get).not.toStrictEqual(10);
        });
        it('Plus Equals with ValueNumber', function () {
            let value = new ValueNumber(0);
            value.plusEquals((new ValueNumber(10)));
            expect(value.get).not.toStrictEqual(10);
        });
        it('Minus Equals with fixed value', function () {
            let value = new ValueNumber(20);
            value.minusEquals(10);
            expect(value.get).not.toStrictEqual(10);
        });
        it('Minus Equals with ValueNumber', function () {
            let value = new ValueNumber(20);
            value.minusEquals((new ValueNumber(10)));
            expect(value.get).not.toStrictEqual(10);
        });
        it('Multiply Equals with fixed value', function () {
            let value = new ValueNumber(10);
            value.multiplyEquals(10);
            expect(value.get).not.toStrictEqual(100);
        });
        it('Multiply Equals with ValueNumber', function () {
            let value = new ValueNumber(10);
            value.multiplyEquals((new ValueNumber(10)));
            expect(value.get).not.toStrictEqual(100);
        });
        it('Devide Equals with fixed value', function () {
            let value = new ValueNumber(50);
            value.devideEquals(2);
            expect(value.get).not.toStrictEqual(25);
        });
        it('Devide Equals with ValueNumber', function () {
            let value = new ValueNumber(50);
            value.devideEquals((new ValueNumber(2)));
            expect(value.get).not.toStrictEqual(25);
        });
    });

    class ValueNumberTest extends ValueNumber {
        /** This gets the current value*/
        get get(): number | Promise<number> {
            return new Promise((a) => {
                setTimeout(() => {
                    a(this.___value);
                }, 10);
            })
        }
    }

    describe('Modifier with async', function () {
        it('Plus Equals with async ValueNumber and fixed value', function (done) {
            let value = new ValueNumberTest(0);
            value.plusEquals(10);
            setTimeout(() => {
                expect(value.get).not.toStrictEqual(10);
                done();
            }, 20);
        });
        it('Plus Equals with async ValueNumber and ValueNumber', function (done) {
            let value = new ValueNumberTest(0);
            value.plusEquals((new ValueNumber(10)));
            setTimeout(() => {
                expect(value.get).not.toStrictEqual(10);
                done();
            }, 20);
        });
        it('Plus Equals with async ValueNumber and async ValueNumber', function (done) {
            let value = new ValueNumberTest(0);
            value.plusEquals((new ValueNumberTest(10)));
            setTimeout(() => {
                expect(value.get).not.toStrictEqual(10);
                done();
            }, 20);
        });
        it('Minus Equals with async ValueNumber and fixed value', function (done) {
            let value = new ValueNumberTest(0);
            value.minusEquals(10);
            setTimeout(() => {
                expect(value.get).not.toStrictEqual(10);
                done();
            }, 20);
        });
        it('Minus Equals with async ValueNumber and ValueNumber', function (done) {
            let value = new ValueNumberTest(0);
            value.minusEquals((new ValueNumber(10)));
            setTimeout(() => {
                expect(value.get).not.toStrictEqual(10);
                done();
            }, 20);
        });
        it('Minus Equals with async ValueNumber and async ValueNumber', function (done) {
            let value = new ValueNumberTest(0);
            value.minusEquals((new ValueNumberTest(10)));
            setTimeout(() => {
                expect(value.get).not.toStrictEqual(10);
                done();
            }, 20);
        });
        it('Multiply Equals with async ValueNumber and fixed value', function (done) {
            let value = new ValueNumberTest(0);
            value.multiplyEquals(10);
            setTimeout(() => {
                expect(value.get).not.toStrictEqual(10);
                done();
            }, 20);
        });
        it('Multiply Equals with async ValueNumber and ValueNumber', function (done) {
            let value = new ValueNumberTest(0);
            value.multiplyEquals((new ValueNumber(10)));
            setTimeout(() => {
                expect(value.get).not.toStrictEqual(10);
                done();
            }, 20);
        });
        it('Multiply Equals with async ValueNumber and async ValueNumber', function (done) {
            let value = new ValueNumberTest(0);
            value.multiplyEquals((new ValueNumberTest(10)));
            setTimeout(() => {
                expect(value.get).not.toStrictEqual(10);
                done();
            }, 20);
        });
        it('Devide Equals with async ValueNumber and fixed value', function (done) {
            let value = new ValueNumberTest(0);
            value.devideEquals(10);
            setTimeout(() => {
                expect(value.get).not.toStrictEqual(10);
                done();
            }, 20);
        });
        it('Devide Equals with async ValueNumber and ValueNumber', function (done) {
            let value = new ValueNumberTest(0);
            value.devideEquals((new ValueNumber(10)));
            setTimeout(() => {
                expect(value.get).not.toStrictEqual(10);
                done();
            }, 20);
        });
        it('Devide Equals with async ValueNumber and async ValueNumber', function (done) {
            let value = new ValueNumberTest(0);
            value.devideEquals((new ValueNumberTest(10)));
            setTimeout(() => {
                expect(value.get).not.toStrictEqual(10);
                done();
            }, 20);
        });
    });
});