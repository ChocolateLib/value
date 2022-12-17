import { describe, it, expect } from '@jest/globals';
import { ValueArray } from "../src/index";

describe('Array Value', function () {

    describe('Initial value', function () {
        it('Should have an initial value of array', function () {
            expect((new ValueArray([])).get).toBeInstanceOf(Array);
        });
        it('Should have an initial value of array, with numbers', function () {
            let val = (new ValueArray([1, 2, 3])).get;
            if (val instanceof Array) {
                expect(val[0]).toStrictEqual(1);
                expect(val[1]).toStrictEqual(2);
                expect(val[2]).toStrictEqual(3);
            }
        });
        it('Should have an initial value of array, with booleans', function () {
            let val = (new ValueArray([true, false, true])).get;
            if (val instanceof Array) {
                expect(val[0]).toStrictEqual(true);
                expect(val[1]).toStrictEqual(false);
                expect(val[2]).toStrictEqual(true);
            }
        });
        it('Should have an initial value of array, with strings', function () {
            let val = (new ValueArray(['1', '2', '3'])).get;
            if (val instanceof Array) {
                expect(val[0]).toStrictEqual('1');
                expect(val[1]).toStrictEqual('2');
                expect(val[2]).toStrictEqual('3');
            }
        });
        it('Should have an initial value of array, with numbers, booleans and strings', function () {
            let val = (new ValueArray([1, false, '3'])).get;
            if (val instanceof Array) {
                expect(val[0]).toStrictEqual(1);
                expect(val[1]).toStrictEqual(false);
                expect(val[2]).toStrictEqual('3');
            }
        });
    });

    describe('Array Info', function () {
        it('Checking lenght of array', function () {
            let array = new ValueArray<number>([1, 2, 3, 4, 5]);
            expect(array.length).toStrictEqual(5);
            array.set = [1, 2, 3];
            expect(array.length).toStrictEqual(3);
        });
        it('Finding index of value', function () {
            let array = new ValueArray<number>([1, 2, 3, 4, 5]);
            expect(array.indexOf(3)).toStrictEqual(2);
        });
        it('Finding index of value after a specific index', function () {
            let array = new ValueArray<number>([1, 2, 3, 4, 5, 1]);
            expect(array.indexOf(1)).toStrictEqual(0);
            expect(array.indexOf(1, 3)).toStrictEqual(5);
        });
        it('Getting value at index', function () {
            let array = new ValueArray<number>([1, 2, 3, 4, 5, 1]);
            expect(array.getIndex(1)).toStrictEqual(2);
            expect(array.getIndex(4)).toStrictEqual(5);
            expect(array.getIndex(9)).toStrictEqual(undefined);
        });
        it('Comparing to null', function () {
            expect((new ValueArray([1, 2, 3])).compare(null)).toBeTruthy();
        });
        it('Comparing to boolean', function () {
            expect((new ValueArray([1, 2, 3])).compare(true)).toBeTruthy();
        });
        it('Comparing to number', function () {
            expect((new ValueArray([1, 2, 3])).compare(1)).toBeTruthy();
        });
        it('Comparing to string', function () {
            expect((new ValueArray([1, 2, 3])).compare('null')).toBeTruthy();
        });
        it('Comparing to object', function () {
            expect((new ValueArray([1, 2, 3])).compare({})).toBeTruthy();
        });
        it('Comparing to different array', function () {
            expect((new ValueArray([1, 2, 3])).compare([2, 3])).toBeTruthy();
        });
        it('Comparing to same array', function () {
            expect((new ValueArray([1, 2, 3])).compare([1, 2, 3])).toBeFalsy();
        });
        it('Comparing to different ValueArray', function () {
            expect((new ValueArray([1, 2, 3])).compare((new ValueArray([2, 3])))).toBeTruthy();
        });
        it('Comparing to same ValueArray', function () {
            expect((new ValueArray([1, 2, 3])).compare((new ValueArray([1, 2, 3])))).toBeFalsy();
        });
        it('JSON override', function () {
            let value = new ValueArray([1, 2, 3]);
            expect(JSON.stringify(value)).toStrictEqual('[1,2,3]');
        });
    });

    describe('Array Modifications', function () {
        it('Pushing numbers to empty array', function () {
            let array = new ValueArray<number>([]);
            array.push(1, 2, 3);
            expect(array.length).toStrictEqual(3);
            let val = array.get;
            if (val instanceof Array) {
                expect(val[0]).toStrictEqual(1);
                expect(val[1]).toStrictEqual(2);
                expect(val[2]).toStrictEqual(3);
            }
        });
        it('Pushing numbers to array with element in', function () {
            let array = new ValueArray<number>([0]);
            array.push(1, 2, 3);
            expect(array.length).toStrictEqual(4);
            let val = array.get;
            if (val instanceof Array) {
                expect(val[1]).toStrictEqual(1);
                expect(val[2]).toStrictEqual(2);
                expect(val[3]).toStrictEqual(3);
            }
        });
        it('Unshifting numbers to empty array', function () {
            let array = new ValueArray<number>([]);
            array.unshift(1, 2, 3);
            expect(array.length).toStrictEqual(3);
            let val = array.get;
            if (val instanceof Array) {
                expect(val[0]).toStrictEqual(1);
                expect(val[1]).toStrictEqual(2);
                expect(val[2]).toStrictEqual(3);
            }
        });
        it('Unshifting numbers to array with element in', function () {
            let array = new ValueArray<number>([0]);
            array.unshift(1, 2, 3);
            expect(array.length).toStrictEqual(4);
            let val = array.get;
            if (val instanceof Array) {
                expect(val[0]).toStrictEqual(1);
                expect(val[1]).toStrictEqual(2);
                expect(val[2]).toStrictEqual(3);
            }
        });
        it('Popping from array', function () {
            let array = new ValueArray<number>([0, 1, 2, 3, 4, 5, 6]);
            let res = array.pop();
            expect(array.length).toStrictEqual(6);
            let val = array.get;
            if (val instanceof Array) {
                expect(res).toStrictEqual(6);
            }
        });
        it('Popping from array so it becomes empty', function () {
            let array = new ValueArray<number>([0]);
            let res = array.pop();
            expect(array.length).toStrictEqual(0);
            let val = array.get;
            if (val instanceof Array) {
                expect(res).toStrictEqual(0);
            }
        });
        it('Shifting from array', function () {
            let array = new ValueArray<number>([0, 1, 2, 3, 4, 5, 6]);
            let res = array.shift();
            expect(array.length).toStrictEqual(6);
            let val = array.get;
            if (val instanceof Array) {
                expect(res).toStrictEqual(0);
            }
        });
        it('Shifting from array so it becomes empty', function () {
            let array = new ValueArray<number>([6]);
            let res = array.shift();
            expect(array.length).toStrictEqual(0);
            let val = array.get;
            if (val instanceof Array) {
                expect(res).toStrictEqual(6);
            }
        });
        it('Splicing element into empty array', function () {
            let array = new ValueArray<number>([]);
            let res = array.splice(0, 0, 1, 2, 3);
            expect(array.length).toStrictEqual(3);
            expect(res).toBeInstanceOf(Array);
            let val = array.get;
            if (val instanceof Array) {
                expect(val[0]).toStrictEqual(1);
                expect(val[1]).toStrictEqual(2);
                expect(val[2]).toStrictEqual(3);
            }
        });
        it('Splicing element into none empty array', function () {
            let array = new ValueArray<number>([7, 8, 9]);
            let res = array.splice(2, 0, 1, 2, 3);
            expect(array.length).toStrictEqual(6);
            expect(res).toBeInstanceOf(Array);
            let val = array.get;
            if (val instanceof Array) {
                expect(val[0]).toStrictEqual(7);
                expect(val[1]).toStrictEqual(8);
                expect(val[2]).toStrictEqual(1);
            }
        });
        it('Splicing element from array', function () {
            let array = new ValueArray<number>([1, 2, 3, 4, 5]);
            let res = array.splice(2, 2);
            expect(array.length).toStrictEqual(3);
            expect(res).toBeInstanceOf(Array);
            let val = array.get;
            if (val instanceof Array) {
                expect(val[0]).toStrictEqual(1);
                expect(val[2]).toStrictEqual(5);
                expect(res[0]).toStrictEqual(3);
                expect(res[1]).toStrictEqual(4);
            }
        });
        it('Splicing element into empty array and from array', function () {
            let array = new ValueArray<number>([]);
            let res = array.splice(2, 2, 1, 2, 3);
            expect(array.length).toStrictEqual(3);
            expect(res).toBeInstanceOf(Array);
            let val = array.get;
            if (val instanceof Array) {
                expect(val[0]).toStrictEqual(1);
                expect(val[2]).toStrictEqual(3);
                expect(res.length).toStrictEqual(0);
            }
        });
        it('Splicing element into array and from array', function () {
            let array = new ValueArray<number>([7, 8, 9, 10]);
            let res = array.splice(2, 2, 1, 2, 3);
            expect(array.length).toStrictEqual(5);
            expect(res).toBeInstanceOf(Array);
            let val = array.get;
            if (val instanceof Array) {
                expect(val[0]).toStrictEqual(7);
                expect(val[2]).toStrictEqual(1);
                expect(res[0]).toStrictEqual(9);
                expect(res[1]).toStrictEqual(10);
            }
        });
        it('Empty array', function () {
            let array = new ValueArray<number>([7, 8, 9, 10]);
            array.empty();
            expect(array.length).toStrictEqual(0);
        });
        it('Remove if exist function', function () {
            let array = new ValueArray<number>([7, 8, 9, 10, 7, 8, 9, 7, 8, 9]);
            expect(array.removeIfExist(7)).toStrictEqual(true);
            expect(array.length).toStrictEqual(7);
            let val = array.get;
            if (val instanceof Array) {
                expect(val[0]).toStrictEqual(8);
            }
        });
        it('Remove if exist after index', function () {
            let array = new ValueArray<number>([7, 8, 9, 10, 7, 8, 9, 7, 8, 9]);
            expect(array.removeIfExist(7, 7)).toStrictEqual(true);
            expect(array.length).toStrictEqual(9);
            let val = array.get;
            if (val instanceof Array) {
                expect(val[0]).toStrictEqual(7);
            }
        });
        it('Remove if exist removing nothing', function () {
            let array = new ValueArray<number>([7, 8, 9, 10, 7, 8, 9, 7, 8, 9]);
            expect(array.removeIfExist(99)).toStrictEqual(false);
            expect(array.length).toStrictEqual(10);
        });
        it('Setting value of index', function () {
            let array = new ValueArray<number>([7, 8, 9, 10, 7, 8, 9, 7, 8, 9]);
            array.setIndex(3, 99);
            let val = array.get;
            if (val instanceof Array) {
                expect(val[3]).toStrictEqual(99);
            }
        });
        it('Setting value of index which does not exist', function () {
            let array = new ValueArray<number>([7, 8, 9]);
            array.setIndex(10, 99);
            expect(array.length).toStrictEqual(11);
            let val = array.get;
            if (val instanceof Array) {
                expect(val[4]).toStrictEqual(undefined);
                expect(val[6]).toStrictEqual(undefined);
                expect(val[10]).toStrictEqual(99);
            }
        });
    });

    describe('Listeners', function () {
        it('Adding listener to array', function () {
            let array = new ValueArray<number>([1, 2, 3, 4, 5]);
            let func = (f: number) => { };
            expect(array.addArrayListener(func)).toStrictEqual(func);
            expect(array.arrayInUse).toBeTruthy();
            expect(array.hasArrayListener(func)).toBeTruthy();
        });
        it('Adding multiple listeners to array', function () {
            let array = new ValueArray<number>([1, 2, 3, 4, 5]);
            let func = (f: number) => { };
            expect(array.addArrayListener(func)).toStrictEqual(func);
            let func1 = (f: number) => { };
            expect(array.addArrayListener(func1)).toStrictEqual(func1);
            let func2 = (f: number) => { };
            expect(array.addArrayListener(func2)).toStrictEqual(func2);
            expect(array.arrayInUse).toBeTruthy();
            expect(array.hasArrayListener(func)).toBeTruthy();
            expect(array.hasArrayListener(func1)).toBeTruthy();
            expect(array.hasArrayListener(func2)).toBeTruthy();
        });
        it('Adding and removing multiple listeners to/from array', function () {
            let array = new ValueArray<number>([1, 2, 3, 4, 5]);
            let func = (f: number) => { };
            expect(array.addArrayListener(func)).toStrictEqual(func);
            let func1 = (f: number) => { };
            expect(array.addArrayListener(func1)).toStrictEqual(func1);
            let func2 = (f: number) => { };
            expect(array.addArrayListener(func2)).toStrictEqual(func2);
            expect(array.arrayInUse).toBeTruthy();
            expect(array.hasArrayListener(func)).toBeTruthy();
            expect(array.hasArrayListener(func1)).toBeTruthy();
            expect(array.hasArrayListener(func2)).toBeTruthy();
            expect(array.removeArrayListener(func)).toStrictEqual(func);
            expect(array.hasArrayListener(func)).toBeFalsy();
            expect(array.hasArrayListener(func1)).toBeTruthy();
            expect(array.hasArrayListener(func2)).toBeTruthy();
            expect(array.removeArrayListener(func2)).toStrictEqual(func2);
            expect(array.hasArrayListener(func2)).toBeFalsy();
            expect(array.hasArrayListener(func1)).toBeTruthy();
        });
    });

    describe('Events', function () {
        it('Event on pushing one value', function (done) {
            let array = new ValueArray<number>([1]);
            let func = (index: number, amount: number, values?: number[]) => {
                expect(index).toStrictEqual(1);
                expect(amount).toStrictEqual(1);
                expect(values).toBeInstanceOf(Array);
                if (values) {
                    expect(values[0]).toStrictEqual(2);
                }
                done();
            };
            array.addArrayListener(func);
            array.push(2);
        });
        it('Event on pushing multiple value', function (done) {
            let array = new ValueArray<number>([1, 2]);
            let func = (index: number, amount: number, values?: number[]) => {
                expect(index).toStrictEqual(2);
                expect(amount).toStrictEqual(4);
                expect(values).toBeInstanceOf(Array);
                if (values) {
                    expect(values.length).toStrictEqual(4);
                }
                done();
            };
            array.addArrayListener(func);
            array.push(2, 3, 4, 5);
        });
        it('Event on unshifting one value', function (done) {
            let array = new ValueArray<number>([1]);
            let func = (index: number, amount: number, values?: number[]) => {
                expect(index).toStrictEqual(0);
                expect(amount).toStrictEqual(1);
                expect(values).toBeInstanceOf(Array);
                if (values) {
                    expect(values[0]).toStrictEqual(2);
                }
                done();
            };
            array.addArrayListener(func);
            array.unshift(2);
        });
        it('Event on unshifting multiple value', function (done) {
            let array = new ValueArray<number>([1, 2]);
            let func = (index: number, amount: number, values?: number[]) => {
                expect(index).toStrictEqual(0);
                expect(amount).toStrictEqual(4);
                expect(values).toBeInstanceOf(Array);
                if (values) {
                    expect(values.length).toStrictEqual(4);
                }
                done();
            };
            array.addArrayListener(func);
            array.unshift(2, 3, 4, 5);
        });
        it('Event on popping value', function (done) {
            let array = new ValueArray<number>([1, 2, 3, 4]);
            let func = (index: number, amount: number, values?: number[]) => {
                expect(index).toStrictEqual(3);
                expect(amount).toStrictEqual(-1);
                expect(values).toBeUndefined();
                done();
            };
            array.addArrayListener(func);
            array.pop();
        });
        it('Event on shifting value', function (done) {
            let array = new ValueArray<number>([1, 2, 3, 4]);
            let func = (index: number, amount: number, values?: number[]) => {
                expect(index).toStrictEqual(0);
                expect(amount).toStrictEqual(-1);
                expect(values).toBeUndefined();
                done();
            };
            array.addArrayListener(func);
            array.shift();
        });
        it('Event on splicing values into array', function (done) {
            let array = new ValueArray<number>([1, 2, 3, 4]);
            let func = (index: number, amount: number, values?: number[]) => {
                expect(index).toStrictEqual(2);
                expect(amount).toStrictEqual(3);
                expect(values).toBeInstanceOf(Array);
                if (values) {
                    expect(values.length).toStrictEqual(3);
                }
                done();
            };
            array.addArrayListener(func);
            array.splice(2, 0, 1, 2, 3);
        });
        it('Event on splicing values from array', function (done) {
            let array = new ValueArray<number>([1, 2, 3, 4, 5, 6, 7]);
            let func = (index: number, amount: number, values?: number[]) => {
                expect(index).toStrictEqual(2);
                expect(amount).toStrictEqual(-3);
                expect(values).toBeUndefined();
                done();
            };
            array.addArrayListener(func);
            array.splice(2, 3);
        });
        it('Event on splicing values to/from array', function (done) {
            let array = new ValueArray<number>([1, 2, 3, 4, 5, 6, 7]);
            let i = 0
            let func = (index: number, amount: number, values?: number[]) => {
                if (i == 0) {
                    expect(index).toStrictEqual(2);
                    expect(amount).toStrictEqual(-3);
                    expect(values).toBeUndefined();
                } else {
                    expect(index).toStrictEqual(2);
                    expect(amount).toStrictEqual(3);
                    expect(values).toBeInstanceOf(Array);
                    if (values) {
                        expect(values.length).toStrictEqual(3);
                    }
                    done();
                }
                i++;
            };
            array.addArrayListener(func);
            array.splice(2, 3, 1, 2, 3);
        });
        it('Event on removeif exist', function (done) {
            let array = new ValueArray<number>([1, 2, 3, 4, 5, 6, 7]);
            let func = (index: number, amount: number, values?: number[]) => {
                expect(index).toStrictEqual(1);
                expect(amount).toStrictEqual(-1);
                expect(values).toBeUndefined();
                done();
            };
            array.addArrayListener(func);
            array.removeIfExist(2);
        });
        it('Event on setIndex', function (done) {
            let array = new ValueArray<number>([1, 2, 3, 4, 5]);
            let func = (index: number, amount: number, values?: number[]) => {
                expect(index).toStrictEqual(2);
                expect(amount).toStrictEqual(0);
                expect(values).toBeInstanceOf(Array);
                if (values) {
                    expect(values[0]).toStrictEqual(99);
                }
                done();
            };
            array.addArrayListener(func);
            array.setIndex(2, 99);
        });
        it('Event on setIndex outside existing array', function (done) {
            let array = new ValueArray<number>([1, 2, 3, 4, 5]);
            let func = (index: number, amount: number, values?: number[]) => {
                expect(index).toStrictEqual(5);
                expect(amount).toStrictEqual(6);
                expect(values).toBeInstanceOf(Array);
                if (values) {
                    expect(values[0]).toStrictEqual(undefined);
                    expect(values[5]).toStrictEqual(undefined);
                }
                done();
            };
            array.addArrayListener(func);
            array.setIndex(10, 99);
        });
    });
});