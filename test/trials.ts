import { ValueLimited } from "../src";

let value = new ValueLimited(1, [{ func(val) { return val !== 10 }, reason: 'Not valid' }]);
value.set = 10;