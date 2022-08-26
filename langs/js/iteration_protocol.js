const a = {
    [Symbol.iterator]() {
        let i = 0;
        console.log(this);
        return {
            next() {
                let done = false;
                let value = i;
                if (i++ >= 10) {
                    done = true;
                    value = undefined;
                }
                return {
                    done,
                    value
                }
            }
        }
    }
};
const b = [4, 5, 6];
console.log(Array.from([...b]));
for (const iterator of a) {
    console.log(iterator);
}

const test = Object.getOwnPropertySymbols(a);
const test2 = Object.getOwnPropertySymbols(b);
console.log(test);


const s1 = Symbol('1');
const s2 = Symbol.for('1');

console.log(Symbol.keyFor(s1));
console.log(Symbol.keyFor(s2));
const x = new b.constructor[Symbol.species];
console.log();


class test3 {
    static get [Symbol.species]() { return test3 }
    constructor() {
        console.log(new Date().toISOString().slice(0, -1).replace("T", " "))
        this.timestamps = Date.now();
    }
}

const t3 = new test3;
const t4 = new t3.constructor[Symbol.species];
console.log(t3, t4)