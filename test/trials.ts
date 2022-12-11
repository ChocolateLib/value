import { ValueLimitedNumber } from "../src";

console.log('Yo');
let value = new ValueLimitedNumber(5, 1, 10, 2);
value.set = 0;
value.set = 0;
let value2 = new ValueLimitedNumber(5, undefined, undefined, 3);
value2.set = 10;
value2.set = 0;

let value3 = new ValueLimitedNumber(20, 5, 600);
value3.step = 7;

let value4 = new ValueLimitedNumber(21, 5, 600, 7);
value4.step = 8;
