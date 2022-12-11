import { stringByteLimit } from "@chocolatelib/utils";
import { Value } from "../value";

/**Extension of Value class to allow limiting Value value*/
export class ValueLimitedString extends Value<string> {
    private _maxLength: number | undefined;
    private _maxByteLength: number | undefined;
    private _allowed: string[] | undefined;

    /**Constructor
     * @param init initial value of the Value
     * @param maxLength the maximum character length of the string
     * @param maxByteLength the maximum byte length of the string
     * @param regEx regular expression which string must not contain
     * @param allowed list of allowed values for string*/
    constructor(init: string, maxLength?: number, maxByteLength?: number, allowed?: string[]) {
        super(init);
        this._maxLength = maxLength;
        this._maxByteLength = maxByteLength;
        this._allowed = allowed;
    }

    /** This sets the value and dispatches an event*/
    set set(val: string) {
        if (this._allowed && !this._allowed.includes(val)) {
            return;
        }
        if (this._maxLength && val.length > this._maxLength) {
            val = val.slice(0, this._maxLength);
        }
        if (this._maxByteLength) {
            val = stringByteLimit(val, this._maxByteLength);
        }
        if (this.___value !== val) {
            this.___value = val;
            this.___update();
        }
    }



    /**Returns max length*/
    get maxLength() {
        return this._maxLength;
    }
    /**Changes max length of string*/
    set maxLength(maxLength: number | undefined) {
        this._maxLength = maxLength;
        if (this._maxLength && this.___value.length > this._maxLength) {
            this.___value = this.___value.slice(0, this._maxLength);
            this.___update();
        }
    }

    /**Returns max byte length*/
    get maxByteLength() {
        return this._maxByteLength;
    }
    /**Changes max byte length of string*/
    set maxByteLength(maxByteLength: number | undefined) {
        this._maxByteLength = maxByteLength;
        if (this._maxByteLength) {
            let val = stringByteLimit(this.___value, this._maxByteLength);
            if (this.___value !== val) {
                this.___value = val;
                this.___update();
            }
        }
    }

    /**Returns allowed strings */
    get allowed() {
        return this._allowed;
    }
    /**Changes allowed strings list, if the current string is not on the allowed list, it will set it to the first on the list
     * to prevent this set the value to the desired string before changing the list */
    set allowed(allowed: string[] | undefined) {
        this._allowed = allowed;
        if (this._allowed && !this._allowed.includes(this.___value)) {
            this.___value = this._allowed[0];
            this.___update();
        }
    }
}