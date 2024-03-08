const path = require('path');
const wasm = require("./wasm_require_node");


(async () => {
    const mod = await wasm.require(path.resolve(__dirname, "./wasm.go"));
    console.log();
})()
