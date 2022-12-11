import { Value, Listener } from "../value";

/*Extension of ValueProxy to allow for extracting the value of a key in a Value with an object value */
export class ValueObjectKeyProxy<KeyType, ObjectType extends object> extends Value<KeyType | undefined> {
    protected ___key: string;
    protected ___proxy: Value<ObjectType> | undefined;
    protected ___listener: Listener<ObjectType> | undefined;

    /**Constructor
     * @param key key to extract from the object
     * @param proxy */
    constructor(key: string, proxy?: Value<ObjectType>) {
        super(undefined);
        this.___key = key;
        if (proxy) {
            this.proxy = proxy;
        }
    }

    /**Changes the proxy object*/
    set proxy(proxy: Value<ObjectType>) {
        if (this.___listener) {
            if (this.___proxy) {
                this.___proxy.removeListener(this.___listener);
            }
            this.___listener = proxy.addListener((val) => {
                //@ts-expect-error
                super.set = val[this.___key];
            }, true);
        }
        this.___proxy = proxy;
    }

    addListener(func: Listener<KeyType | undefined>, run?: boolean) {
        super.addListener(func, run);
        if (!this.___listener && this.___proxy) {
            this.___listener = this.___proxy.addListener((val) => {
                //@ts-expect-error
                super.set = val[this.___key];
            });
        }
        return func;
    }

    removeListener(func: Listener<KeyType | undefined>) {
        super.removeListener(func);
        if (!this.inUse && this.___listener && this.___proxy) {
            this.___proxy.removeListener(this.___listener);
            delete this.___listener;
        }
        return func;
    }

    get get(): KeyType | Promise<KeyType | undefined> | undefined {
        if (this.___proxy) {
            let val = this.___proxy.get;
            if (val instanceof Promise) {
                return val.then((val) => {
                    //@ts-expect-error
                    return val[this.___key];
                });
            } else {
                //@ts-expect-error
                return val[this.___key];
            }
        }
    }

    set set(val: KeyType | undefined) {
        if (this.___proxy) {
            let buff = this.___proxy.get;
            if (buff instanceof Promise) {
                buff.then((buff) => {
                    //@ts-expect-error
                    buff[this.___key] = val;
                    //@ts-expect-error
                    this.___proxy.___update();
                });
            } else {
                //@ts-expect-error
                buff[this.___key] = val;
                //@ts-expect-error
                this.___proxy.___update();
            }
        }
    }
}