/**Function to listen for value changes */
export type Listener<ValueType> = (val: ValueType) => void

/**The value class is a container for a value which can have events listeners registered*/
export class Value<ValueType> {
    private ___valueListeners: Listener<ValueType>[];
    protected ___value: ValueType;

    /**Constructor
     * @param init initial value of the Value*/
    constructor(init: ValueType) {
        this.___valueListeners = [];
        this.___value = init;
    }

    /**This adds a function as an event listener to the value
     * @param run set true to run listener with Values value instantly*/
    addListener(func: Listener<ValueType>, run?: boolean) {
        this.___valueListeners.push(func);
        if (run) {
            let value = this.get;
            if (value instanceof Promise) {
                value.then(func);
            } else {
                func(value);
            }
        }
        return func;
    }

    /**This removes a function as an event listener from the value*/
    removeListener(func: Listener<ValueType>) {
        let index = this.___valueListeners.indexOf(func);
        if (index != -1) {
            this.___valueListeners.splice(index, 1);
        }
        return func;
    }

    /** This gets the current value*/
    get get(): ValueType | Promise<ValueType> {
        return this.___value;
    }

    /** This sets the value and dispatches an event*/
    set set(val: ValueType) {
        if (this.___value !== val) {
            this.___value = val;
            this.___update();
        }
    }

    /** This sends an update without changing the value, can be used for more complex values*/
    protected ___update() {
        if (this.___valueListeners) {
            for (let i = 0, m = this.___valueListeners.length; i < m; i++) {
                try {
                    this.___valueListeners[i](this.___value);
                } catch (e) {
                    console.warn('Failed while calling value listeners ', e);
                }
            }
        }
    }

    /** This method can compares any value the value, returns true if different
     * @param {ValueType} val value to compare to*/
    compare(val: any): boolean | Promise<boolean> {
        let value = this.get;
        if (value instanceof Promise) {
            return value.then((value) => { return val !== value });
        } else {
            return val !== value;
        }
    }

    /** Returns wether the value has listeners, true means it has at least a listener*/
    get inUse() {
        return this.___valueListeners.length !== 0;
    }

    /** Returns wether the value has a specific listeners, true means it has that listener*/
    hasListener(func: Listener<ValueType>) {
        return this.___valueListeners.indexOf(func) !== -1;
    }
}