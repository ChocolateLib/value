import { Value, ValueObjectKeyProxy } from "../src";

console.log('Yo');
let value = new Value({});
value.addListener(() => {
    console.log('Yo');
});
let key = new ValueObjectKeyProxy<number, { test: number } | {}>('test', value);
key.set = 1;