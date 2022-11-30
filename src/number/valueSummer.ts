import { Value } from "../value";
import { ValueMulti } from "../valueMulti";

/**Sums up values from other Values only numbers*/
export class ValueSummer extends ValueMulti<number, number>{
    /**Constructor
     * @param values list of values to perform multi operation on*/
    constructor(values?: Value<number>[]) {
        super(values);
    }

    protected ___multiFuncRead(values: number[]) {
        if (values.length) {
            let sum = 0;
            for (let i = 0; i < values.length; i++) {
                sum += values[i];
            }
            return sum;
        }
    }

    protected ___multiFuncWrite(value: number, values: number[], valuesBuffer: number[]) {
        let val = this.get;
        if (val instanceof Promise) {
            val.then((val) => {
                let diff = (value - (val || 0)) / this.___values.length;
                for (let i = 0; i < this.___values.length; i++) {
                    values[i] = valuesBuffer[i] + diff;
                }
            })
        } else {
            let diff = (value - (val || 0)) / this.___values.length;
            for (let i = 0; i < this.___values.length; i++) {
                values[i] = valuesBuffer[i] + diff;
            }
        }
    }
}