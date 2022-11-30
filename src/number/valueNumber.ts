import { Value } from "../value";

/**Extension of Value class to allow limiting Value value*/
export class ValueNumber extends Value<number> {
    /*Performs a plus equals on the value*/
    async plusEquals(val: number | ValueNumber) {
        if (val instanceof ValueNumber) {
            let values = await Promise.all([val.get, this.get]);
            this.set = values[0] + values[1];
        } else {
            let values = await Promise.all([val, this.get]);
            this.set = values[0] + values[1];
        }
    }
    /*Performs a plus equals on the value*/
    async minusEquals(val: number | ValueNumber) {
        if (val instanceof ValueNumber) {
            let values = await Promise.all([val.get, this.get]);
            this.set = values[0] - values[1];
        } else {
            let values = await Promise.all([val, this.get]);
            this.set = values[0] - values[1];
        }
    }
    /*Performs a plus equals on the value*/
    async multiplyEquals(val: number | ValueNumber) {
        if (val instanceof ValueNumber) {
            let values = await Promise.all([val.get, this.get]);
            this.set = values[0] * values[1];
        } else {
            let values = await Promise.all([val, this.get]);
            this.set = values[0] * values[1];
        }
    }
    /*Performs a plus equals on the value*/
    async devideEquals(val: number | ValueNumber) {
        if (val instanceof ValueNumber) {
            let values = await Promise.all([val.get, this.get]);
            this.set = values[0] / values[1];
        } else {
            let values = await Promise.all([val, this.get]);
            this.set = values[0] / values[1];
        }
    }
}