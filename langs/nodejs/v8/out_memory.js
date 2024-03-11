const { showMem } = require("./utils");
const total = [];

for (let j = 0; j < 15; j++) {
    showMem();
    total.push(useMem());
}
showMem();

function useMem() {
    const size = 20 * 1024 * 1024;
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = 0;
    }
    return arr;
}
