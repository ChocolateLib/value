import { Value } from "../value";

/**Extension of Value class to allow a limited number*/
export class ValueLimitedNumber extends Value<number> {
    private _min: number;
    private _max: number;
    private _step: number | undefined;
    private halfStep: number = 0;

    /**Constructor
     * @param init initial value of the Value
     * @param min minimum allowed value
     * @param max maximum allowed value
     * @param step step increment value must fall on eg 2 allows increments of 2 so 0,2,4,6 etc.*/
    constructor(init: number, min: number = -Infinity, max: number = Infinity, step?: number) {
        super(init);
        this._min = min;
        this._max = max;
        if (step) {
            this._step = step;
            this.halfStep = step / 2;
        }
    }

    /** This sets the value and dispatches an event*/
    set set(val: number) {
        if (this._step) {
            let mod = val % this._step;
            val = (mod > this.halfStep ? val + (this._step - mod) : val - mod);
        }
        val = Math.min(this._max, Math.max(this._min, val));
        if (this.___value !== val) {
            this.___value = val;
            this.___update();
        }
    }

    /**Returns minimum allowed value */
    get min() {
        return this._min;
    }
    /**Changes the allowed minimum value, this updates the value if the current value is smaller than the new minimum
     * Set it to -Infinity to disable*/
    set min(min: number) {
        this._min = min;
        let val = Math.max(this._min, this.___value)
        if (this.___value !== val) {
            this.___value = val;
            this.___update();
        }
    }

    /**Returns maximum allowed value */
    get max() {
        return this._max;
    }
    /**Changes the allowed maximum value, this updates the value if the current value is bigger than the new maximum
     * Set it to Infinity to disable*/
    set max(max: number) {
        this._max = max;
        let val = Math.min(this._max, this.___value)
        if (this.___value !== val) {
            this.___value = val;
            this.___update();
        }
    }

    /**Returns step size */
    get step() {
        return this._step;
    }
    /**Changes the allowed minimum value, this updates the value if the current value is smaller than the new minimum*/
    set step(step: number | undefined) {
        if (step) {
            this._step = step;
            this.halfStep = step / 2;
            let mod = this.___value % this._step;
            let val = (mod > this.halfStep ? this.___value + (this._step - mod) : this.___value - mod);
            if (this.___value !== val) {
                this.___value = val;
                this.___update();
            }
        } else {
            delete this._step;
            this.halfStep = 0;
        }
    }
}