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

console.log(Array.from([...a]));
for (const iterator of a) {
    console.log(iterator);
}