import { Value } from "../value";

/**Limiter struct */
export type Limiter<T> = {
    /**Limiter function, returns true to block value*/
    func(val: T): boolean,
    /**Reason for blocking value, can be used for interface*/
    reason: string | ((val: T) => string)
}

/**Extension of Value class to allow limiting Value value*/
export class ValueLimited<ValueType> extends Value<ValueType> {
    private ___limiters: Limiter<ValueType>[] | undefined;

    /**Constructor
     * @param init initial value of the Value*/
    constructor(init: ValueType, limiters?: Limiter<ValueType>[]) {
        super(init)
        this.___limiters = limiters;
    }

    /**Returns the values limiters*/
    get limiters() {
        return this.___limiters
    }

    /** */
    set limiters(limiters: Limiter<ValueType>[] | undefined) {
        if (limiters) {
            this.___limiters = limiters;
        } else {
            delete this.___limiters;
        }
    }

    /**Runs through limiters to check if value is allowed*/
    checkLimit(val: ValueType) {
        if (this.___limiters) {
            for (let i = 0; i < this.___limiters.length; i++) {
                if (this.___limiters[i].func(val)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**Runs through limiters to check if value is allowed*/
    checkLimitReason(val: ValueType): boolean | string {
        if (this.___limiters) {
            for (let i = 0; i < this.___limiters.length; i++) {
                if (this.___limiters[i].func(val)) {
                    switch (typeof this.___limiters[i].reason) {
                        case 'string': return <string>this.___limiters[i].reason;
                        case 'function': return (<(val: ValueType) => string>this.___limiters[i].reason)(val);
                    }
                }
            }
        }
        return true;
    }

    /** This sets the value and dispatches an event*/
    set set(val: ValueType) {
        if (val === this.___value || !this.checkLimit(val)) {
            return;
        }
        this.___value = val;
        this.___update();
    }
}