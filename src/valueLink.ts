import { Listener, Value } from "./value";

//Creates a link between two of more values so that all changes on
export class ValueLink<ValueType> {
    private ___values: Value<ValueType>[] = [];
    private ___valueListeners: Listener<ValueType>[] = [];

    /**Constructor
     * @param values initial Values to link
     * @param link if the link should be created instantly*/
    constructor(values?: Value<ValueType>[], link?: boolean) {
        if (values) {
            this.values(values, link);
        }
    }

    /**Changes the values which are linked
    * @param values initial Values to link
    * @param link if the link should be created instantly*/
    values(values?: Value<ValueType>[], link?: boolean) {
        this.unlink();
        if (values && values.length > 1) {
            this.___values = values;
            if (link) {
                this.link();
            }
        } else {
            this.___values = [];
        }
    }

    //Unlinks the values
    unlink() {
        if (this.___values.length) {
            for (let i = 0; i < this.___values.length; i++) {
                this.___values[i].removeListener(this.___valueListeners[i]);
            }
        }
    }

    //Links the values
    link() {
        if (this.___values.length) {
            for (let i = 0; i < this.___values.length; i++) {
                this.___valueListeners[i] = this.___values[i].addListener((val) => {
                    for (let y = 0; y < this.___values.length; y++) {
                        if (i !== y) {
                            this.___values[y].set = val;
                        }
                    }
                }, i === 0);
            }
        }
    }
}