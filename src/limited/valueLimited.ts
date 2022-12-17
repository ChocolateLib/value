import { Value } from "../value";

/**Function to listen for value changes */
export type LimiterListener<T> = (val: ValueLimited<T>) => void

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
    private ___limitersListeners: LimiterListener<ValueType>[] = [];

    /**Constructor
     * @param init initial value of the Value*/
    constructor(init: ValueType, limiters?: Limiter<ValueType>[]) {
        super(init)
        this.___limiters = limiters;
    }


    /**This adds a function as an listener for changes to the limiters
     * @param run set true to run listener with Values value instantly*/
    addLimiterListener(func: LimiterListener<ValueType>, run?: boolean) {
        this.___limitersListeners.push(func);
        if (run) {
            func(this);
        }
        return func;
    }

    /**This removes a function as an listener for changes to the limiters*/
    removeLimiterListener(func: LimiterListener<ValueType>) {
        let index = this.___limitersListeners.indexOf(func);
        if (index != -1) {
            this.___limitersListeners.splice(index, 1);
        }
        return func;
    }

    /** This sends an update without changing the value, can be used for more complex values*/
    protected ___updateLimiter() {
        if (this.___limitersListeners) {
            for (let i = 0, m = this.___limitersListeners.length; i < m; i++) {
                try {
                    this.___limitersListeners[i](this);
                } catch (e) {
                    console.warn('Failed while calling value listeners ', e);
                }
            }
        }
    }

    /**Returns the values limiters*/
    get limiters() {
        return this.___limiters
    }

    /**Changes the limiter structure*/
    set limiters(limiters: Limiter<ValueType>[] | undefined) {
        if (limiters) {
            this.___limiters = limiters;
        } else {
            delete this.___limiters;
        }
        this.___updateLimiter();
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