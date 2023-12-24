class a {
    static get instance() {
        console.log();
        return new this;
    }
}

class CustomPromise extends a {

    constructor(executor) {
        super();
        executor(this.resolve.bind(this), this.reject.bind(this));
    }

    #result = undefined;
    #state = "pending";
    #eventHandlers = {};
    get #isSettled() {
        return this.#state !== "pending";
    }
    #on(event, cb) {
        if (!this.#eventHandlers[event]) {
            this.#eventHandlers[event] = [];
        }
        this.#eventHandlers[event].push(cb);
    }
    #trigger(event, ...args) {
        if (!this.#eventHandlers[event]) {
            return;
        }
        for (const hander of this.#eventHandlers[event]) {
            hander(args);
        }
    }

    resolve(v) {
        if (this.#isSettled) {
            return;
        }
        this.#state = "fulfilled";
        this.#result = v;
        this.#trigger("settled", this.#state, this.#result)
    }

    reject(e) {
        if (this.#isSettled) {
            return;
        }
        this.#state = "rejected";
        this.#result = e;
        this.#trigger("settled", this.#state, this.#result)
    }

    then(resolve, reject) {
        let result = undefined;
        if (this.#isSettled) {
            if (this.#state === "fulfilled") {
                if (resolve) {
                    result = resolve(this.#result);
                    if (result instanceof CustomPromise) {
                        return result;
                    }
                }
                return new CustomPromise(res => res(result))
            }
            else if (this.#state === "rejected") {
                if (reject) {
                    result = reject(this.#result);
                    if (result instanceof CustomPromise) {
                        return result;
                    }
                    return new CustomPromise(res => res(result))
                }
                return new CustomPromise((_, rej) => rej(result))
            }
        }

        this.#on("settled", () => {
            if (this.#state === "fulfilled") {
                if (resolve) {
                    result = resolve(this.#result);
                    if (result instanceof CustomPromise) {
                        return result;
                    }
                }
                return new CustomPromise(res => res(result))
            }
            else if (this.#state === "rejected") {
                if (reject) {
                    result = reject(this.#result);
                    if (result instanceof CustomPromise) {
                        return result;
                    }
                    return new CustomPromise(res => res(result))
                }
                return new CustomPromise((_, rej) => rej(result))
            }
        })
    }
}

CustomPromise.instance;