import { Value } from "../value";

/**Extension of Value class to allow limiting Value value*/
export class ValueString extends Value<string> {
    /*Performs a plus equals on the value*/
    async plusEquals(val: string | ValueString) {
        if (val instanceof ValueString) {
            let values = await Promise.all([val.get, this.get]);
            this.set = values[0] + values[1];
        } else {
            let values = await Promise.all([val, this.get]);
            this.set = values[0] + values[1];
        }
    }
}