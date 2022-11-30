import { Value, Listener } from "./value";

/**Function used when one of the Values are changed to update value
 * @param values list of values to perform multi operation on*/
export type ReadFunction<ValueType, ValuesType> = (values: ValuesType[]) => ValueType

/**Function used when the multi value is changed to update the value of all the connected Values
 * @param value new value to set
 * @param values list of connected Values
 * @param valuesBuffer list of values of each Value connected */
export type WriteFunction<ValueType, ValuesType> = (value: ValueType, values: ValuesType[], valuesBuffer: ValuesType[]) => void

/**Performs an operation on multiple values */
export class ValueMulti<ValueType, ValuesType> extends Value<ValueType | undefined> {
    protected ___values: Value<ValuesType>[] = [];
    protected ___valuesBuffer: ValuesType[] = [];
    protected ___valuesListeners: Listener<ValuesType>[] = [];
    protected ___updating: boolean = false;

    /**Constructor
     * @param values list of values to perform multi operation on
     * @param readFunc overwrite for reading from multiple values
     * @param writeFunc overwrite for writing to multiple values*/
    constructor(values?: Value<ValuesType>[], readFunc?: ReadFunction<ValueType, ValuesType>, writeFunc?: WriteFunction<ValueType, ValuesType>) {
        super(undefined);
        if (values) {
            this.values = values;
        }
        if (readFunc) {
            this.multiReadFunction = readFunc;
        }
        if (writeFunc) {
            this.multiWriteFunction = writeFunc;
        }
    }

    /**Sets the Values to perform multi-operation on
     * @param values array of Values */
    set values(values: Value<ValuesType>[]) {
        if (this.inUse) {
            this.___disconnect();
        }
        this.___values = [...values];
        if (this.inUse) {
            this.___connect();
        }
    }

    /**Sets the func */
    set multiReadFunction(func: ReadFunction<ValueType, ValuesType>) {
        this.___multiFuncRead = func;
        if (this.inUse) {
            super.set = this.___multiFuncRead(this.___valuesBuffer);
        }
    }

    /**Sets the values to sum up*/
    set multiWriteFunction(func: WriteFunction<ValueType, ValuesType>) {
        this.___multiFuncWrite = func;
    }

    /**Function used when one of the Values are changed to update value
     * @param values list of values to perform multi operation on*/
    protected ___multiFuncRead(values: ValuesType[]): ValueType | undefined {
        //@ts-expect-error
        return values[0];
    };

    /**Function used when the multi value is changed to update the value of all the connected Values
     * @param value new value to set
     * @param values list of connected Values
     * @param valuesBuffer list of values of each Value connected */
    protected ___multiFuncWrite(value: ValueType, values: ValuesType[], valuesBuffer: ValuesType[]) {
        for (let i = 0; i < values.length; i++) {
            //@ts-expect-error
            values[i] = value;
        }
    };

    /** This sets the value and dispatches an event*/
    set set(val: ValueType) {
        let values: ValuesType[] = Array(this.___values.length);
        this.___multiFuncWrite(val, values, this.___valuesBuffer);
        for (let i = 0; i < this.___values.length; i++) {
            this.___values[i].set = values[i];
        }
    }

    /** This get the current value */
    get get(): ValueType | Promise<ValueType | undefined> | undefined {
        if (this.inUse) {
            return super.get;
        } else {
            let promises = [];
            let buffer: ValuesType[] = [];
            for (let i = 0; i < this.___values.length; i++) {
                let val = this.___values[i].get;
                if (val instanceof Promise) {
                    promises.push(val);
                    val.then((val: ValuesType) => {
                        this.___valuesBuffer[i] = val;
                    })
                } else {
                    this.___valuesBuffer[i] = val;
                }
            }
            if (promises.length) {
                return Promise.all(buffer).then(() => {
                    return this.___multiFuncRead(this.___valuesBuffer);
                });
            } else {
                return this.___multiFuncRead(this.___valuesBuffer);
            }
        }
    }

    /**This adds a function as an event listener to the value
     * @param run set true to run listener with Values value instantly*/
    addListener(func: Listener<ValueType | undefined>, run?: boolean) {
        if (!this.inUse) {
            this.___connect();
        }
        return super.addListener(func, run);
    }

    /*This removes a function as an event listener from the value*/
    removeListener(func: Listener<ValueType | undefined>) {
        super.removeListener(func);
        if (!this.inUse) {
            this.___disconnect();
        }
        return func;
    }

    /**Connects listeners to all values*/
    private ___connect() {
        for (let i = 0; i < this.___values.length; i++) {
            this.___valuesListeners[i] = this.___values[i].addListener((val) => {
                this.___valuesBuffer[i] = val;
                if (!this.___updating) {
                    (async () => {
                        await undefined;
                        this.___multiSet = this.___multiFuncRead(this.___valuesBuffer);
                        this.___updating = false;
                    })();
                }
            }, true);
        }
    }

    /**Disconnects listeners from all values*/
    private ___disconnect() {
        this.___updating = false;
        for (let i = 0; i < this.___values.length; i++) {
            this.___values[i].removeListener(this.___valuesListeners[i]);
        }
        this.___valuesListeners = [];
    }

    /*Internal setter wrap*/
    private set ___multiSet(val: ValueType | undefined) {
        super.set = val;
    }
}