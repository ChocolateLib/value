import { Value, ValueArray, ValueLimited } from "../src";

//let value = new ValueLimited(1, [{ func(val) { return val !== 10 }, reason: 'Not valid' }]);
let value = new ValueArray([new Value(1), new Value(2), new Value(3)]);
// value.set = 10;

// let yo = { test1: 'test1', test2: 'test2', test3: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], test4: 'test4' }

// localStorage['test1'] = JSON.stringify(yo)

console.log(JSON.stringify(value));
