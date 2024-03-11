const { showMem } = require("./utils");
const total = [];

for (let j = 0; j < 15; j++) {
    showMem();
    total.push(useMem());
}
showMem();

function useMem() {
    const size = 200 * 1024 * 1024;
    const buffer = Buffer.alloc(size);
    for (let i = 0; i < size; i++) {
        buffer[i] = 0;
    }
    return buffer;
}