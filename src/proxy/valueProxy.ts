import { Listener, Value } from "../value";

/**Defines the base proxy function type*/
export type ProxyFunction<ProxyType, ValueType> = (value: ValueType) => ProxyType

/**Defines a proxy value which can be used to quickly point multiple value listeners to another value*/
export class ValueProxy<ProxyType, ValueType> extends Value<ProxyType | undefined> {
    private ___proxy: Value<ValueType> | undefined;
    private ___listener: Listener<ValueType> | undefined;

    /**Constructor
     * @param proxy value to proxy
     * @param readMapper mapper function to change original value for users of the proxy
     * @param writeMapper mapper function to change values set on the proxy before relaying them to the original*/
    constructor(proxy?: Value<ValueType> | undefined, readMapper?: ProxyFunction<ProxyType, ValueType>, writeMapper?: ProxyFunction<ValueType, ProxyType>) {
        super(undefined);
        this.___proxy = undefined;
        this.___listener = undefined;
        if (proxy) {
            this.proxy = proxy;
        }
        if (readMapper) {
            this.mapperRead = readMapper;
        }
        if (writeMapper) {
            this.mapperWrite = writeMapper;
        }
    }

    /**Changes the Value the proxy points to*/
    set proxy(proxy: Value<ValueType> | undefined) {
        if (this.___listener && this.___proxy) {
            this.___proxy.removeListener(this.___listener);
            if (!proxy) {
                this.___proxy = undefined;
                this.___listener = undefined;
            }
        }
        if (proxy) {
            this.___listener = proxy.addListener((val) => {
                super.set = this.___mapperRead(val);
            }, true);
            this.___proxy = proxy;
        }
    }

    /**Returns the Value this proxies to*/
    get proxy(): Value<ValueType> | undefined {
        return this.___proxy
    }

    /**Sets the mapper function of the proxy value for reading values*/
    set mapperRead(map: ProxyFunction<ProxyType, ValueType>) {
        this.___mapperRead = map;
    }

    /**Returns the currently set mapper function for reading values
     * @returns {MapperFunction} */
    get mapperRead(): ProxyFunction<ProxyType, ValueType> {
        return this.___mapperRead
    }

    /**Default mapper function for reading values*/
    protected ___mapperRead(value: ValueType): ProxyType {
        //@ts-expect-error
        return value
    }

    /**Sets the mapper function of the proxy value for reading values*/
    set mapperWrite(map: ProxyFunction<ValueType, ProxyType>) {
        this.___mapperWrite = map;
    }

    /**Returns the currently set mapper function for reading values*/
    get mapperWrite(): ProxyFunction<ValueType, ProxyType> {
        return this.___mapperWrite;
    }

    /**Default mapper function for writing values*/
    protected ___mapperWrite(value: ProxyType): ValueType {
        //@ts-expect-error
        return value
    }

    /**Adds listener to proxy which will be called when value is changed
     * @param func function to call when value is changed
     * @param run set true to run the provided funtion with the available value*/
    addListener(func: Listener<ProxyType | undefined>, run?: boolean) {
        super.addListener(func, run);
        if (!this.___listener && this.___proxy) {
            this.___listener = this.___proxy.addListener((val) => {
                super.set = this.___mapperRead(val);
            });
        }
        return func;
    }

    /**Removes function from proxy
     * @param func */
    removeListener(func: Listener<ProxyType | undefined>) {
        super.removeListener(func);
        if (!this.inUse && this.___listener && this.___proxy) {
            this.___proxy.removeListener(this.___listener);
            delete this.___listener;
        }
        return func;
    }

    /**This gets the value from the proxied value*/
    get get(): ProxyType | Promise<ProxyType> | undefined {
        if (this.___proxy) {
            let val = this.___proxy.get;
            if (val instanceof Promise) {
                return (async () => {
                    return this.___mapperRead(await val);
                })()
            } else {
                return this.___mapperRead(val);
            }
        }
    }

    /**This sets the value of the proxied value*/
    set set(val: ProxyType) {
        if (this.___proxy) {
            this.___proxy.set = this.___mapperWrite(val);
        }
    }
}