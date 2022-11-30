import { Value } from "./value";

/**The function type for array value listeners
 * @param index the index of addition or deletion
 * @param amount the amount of items is positive for addition or negative for removals
 * @param values contains any new elements added to the array*/
export type ArrayValueListener<ValueType> = (index: number, amount: number, values?: ValueType[]) => void

export class ValueArray<ValueType> extends Value<ValueType[]> {
    private ___arrayValueListeners: ArrayValueListener<ValueType>[];

    /**Constructor
     * @param  init initial value for Value array*/
    constructor(init: ValueType[]) {
        super(init);
        this.___arrayValueListeners = [];
    }

    /**This adds a function as an event listener to the value
     * @param func array listener function to add*/
    addArrayListener(func: ArrayValueListener<ValueType>) {
        this.___arrayValueListeners.push(func);
        return func;
    }

    /**This removes a function as an event listener from the value
     * @param func array listener function to remove*/
    removeArrayListener(func: ArrayValueListener<ValueType>) {
        let index = this.___arrayValueListeners.indexOf(func);
        if (index != -1) {
            this.___arrayValueListeners.splice(index, 1);
        }
        return func;
    }

    /** Returns wether the value has listeners, true means it has at least a listener*/
    get arrayInUse() {
        return this.___arrayValueListeners.length !== 0;
    }

    /** Returns wether the value has a specific listeners, true means it has that listener*/
    hasArrayListener(func: ArrayValueListener<ValueType>) {
        return this.___arrayValueListeners.indexOf(func) !== -1;
    }

    /**Calls all array listeners
    * @param index the index of addition or deletion
    * @param amount the amount of items is positive for addition or negative for removals
    * @param values contains any new elements added to the array*/
    protected ___callArrayListeners(index: number, amount: number, values?: ValueType[]) {
        Object.freeze(values);
        for (let i = 0, m = this.___arrayValueListeners.length; i < m; i++) {
            try {
                this.___arrayValueListeners[i](index, amount, values);
            } catch (e) {
                console.warn('Failed while calling value listeners ', e);
            }
        }
    }

    /**Adds an element to the back of the array */
    push(...elem: ValueType[]) {
        let i = this.___value.length;
        this.___value.push(...elem);
        this.___callArrayListeners(i, elem.length, elem)
    }

    /**Adds an element to the front of the array */
    unshift(...elem: ValueType[]) {
        this.___value.unshift(...elem);
        this.___callArrayListeners(0, elem.length, elem)
    }

    /**Removes an element from the back of the array*/
    pop() {
        let len = this.___value.length;
        let res = this.___value.pop();
        if (len > this.___value.length) {
            this.___callArrayListeners(this.___value.length, -1)
        }
        return res;
    }

    /**Removes an element from the front of the array*/
    shift() {
        let len = this.___value.length;
        let res = this.___value.shift();
        if (len > this.___value.length) {
            this.___callArrayListeners(0, -1)
        }
        return res;
    }

    /** Removes elements from an array and, if necessary, inserts new elements in their place, returning the removed elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     * @param elem Elements to insert into the array in place of the removed elements.
     * @returns An array containing the elements that were removed.*/
    splice(start: number, deleteCount: number, ...elem: ValueType[]): ValueType[] {
        let res = this.___value.splice(start, deleteCount, ...elem);
        if (res.length) {
            this.___callArrayListeners(start, -res.length);
        }
        if (elem.length) {
            this.___callArrayListeners(start, elem.length, elem);
        }
        return res;
    }

    /**Returns the index of the first occurrence of a value in an array, or -1 if it is not present.
     * @param val The value to locate in the array
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0*/
    indexOf(val: ValueType, fromIndex?: number): number {
        return this.___value.indexOf(val, fromIndex);
    }

    /**Empties array of all elements*/
    empty() {
        super.set = [];
    }

    /**Returns length of array */
    get length() { return this.___value.length; }

    /**Removes the given element if it exists, returns true if any elements were found and deleted
     * @param val The value to locate in the array
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0*/
    removeIfExist(val: ValueType, fromIndex?: number): boolean {
        let i, y;
        i = y = this.___value.indexOf(val, fromIndex);
        while (i !== -1) {
            this.___value.splice(i, 1);
            this.___callArrayListeners(i, -1);
            i = this.___value.indexOf(val, fromIndex);
        }
        return y !== -1;
    }

    /**Gets the value from the given index*/
    getIndex(index: number): ValueType | undefined {
        return this.___value[index];
    }

    /**Sets the value from the given index
     * @param index the index to set the value of
     * @param value the value to set the index to
     * @returns the given value */
    setIndex(index: number, value: ValueType): ValueType {
        if (this.___value[index] !== value) {
            if (index > this.___value.length) {
                let arrLen = this.___value.length;
                let len = index - this.___value.length + 1
                let fill = Array(len).fill(undefined);
                fill[len] = value;
                this.___value[index] = value;
                this.___callArrayListeners(arrLen, len, fill);
            } else {
                this.___value[index] = value;
                this.___callArrayListeners(index, 0, [value]);
            }
        }
        return value
    }


    /** This method can compare a value to the internal value, returns true if values are different
     * @param  val value to compare to*/
    compare(val: any): boolean {
        switch (typeof val) {
            case 'object': {
                if (val instanceof Array) {
                    if (val.length === this.___value.length) {
                        for (let i = 0; i < this.___value.length; i++) {
                            if (this.___value[i] !== val[i]) {
                                return true;
                            }
                        }
                        return false;
                    } else {
                        return true;
                    }
                } else if (val instanceof ValueArray) {
                    if (val.___value.length === this.___value.length) {
                        for (let i = 0; i < this.___value.length; i++) {
                            if (this.___value[i] !== val.___value[i]) {
                                return true;
                            }
                        }
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            }
            default:
                return true;
        }
    }
}