import { Value } from "./value";

/**Function to limit setting the value of a Value
 * if the function returns undefined the value is not changed*/
export type Limiter<ValueType> = (val: ValueType) => ValueType | undefined

/**Extension of Value class to allow limiting Value value*/
export class ValueLimited<ValueType> extends Value<ValueType> {
    /**Constructor
     * @param init initial value of the Value*/
    constructor(init: ValueType, limiter: Limiter<ValueType>) {
        super(init)
        if (limiter) {
            this.limiter = limiter;
        }
    }

    /**Default function for limiting the value
     * @param  val value to limit*/
    private ___limiter(val: ValueType): ValueType | undefined { return val; }

    /**Changes the limiter function*/
    set limiter(limiter: Limiter<ValueType>) {
        this.___limiter = limiter;
    }

    /** This sets the value and dispatches an event*/
    set set(val: ValueType) {
        let limited = this.___limiter(val)
        if (this.___value === limited || limited === undefined) {
            return;
        }
        this.___value = limited;
        this.___update();
    }
}