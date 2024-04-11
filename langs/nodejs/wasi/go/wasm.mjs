const wasm = await import("./wasm_loader_node.js");

const mod = await wasm.load(new URL("./main-js.wasm", import.meta.url), "test");

console.log(`test: 1 + 2 =`, mod.add(1, 2));
