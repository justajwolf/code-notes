import { WASI } from 'wasi';
import fs from 'node:fs/promises';
import process from 'node:process';

/**
 * 利用 nodejs 原生提供 wasi 接口，为wasm构建 global 全局对象，也就是下面的 wasi.getImportObject() 返回的对象
 */
const wasi = new WASI({
    version: 'preview1',
    args: process.argv,
    env: process.env,
    preopens: {
        '/': import.meta.dirname,
    },
});


/**
 * 加载 wasm 文件，也可将文件，以 data-url 的形式(base64)，嵌入到代码中
 */
const wasmFileBuf = await fs.readFile(new URL("./lexer.wasm", import.meta.url));

/**
 * WebAssembly为全局对象，编译wasm文件为WebAssembly模块
 */
const wasmModule = await WebAssembly.compile(wasmFileBuf);

// @ts-ignore
// 实例化 WebAssembly 模块 为 WebAssembly.Instance
const wasmIns = await WebAssembly.instantiate(wasmModule, wasi.getImportObject());
// wasi.start(wasmIns);
// exports 即为 wasm暴露的api
console.log(wasmIns.exports);

// wasiImport 为 nodejs 为 wasm 构建的global对象
// console.log(wasi.wasiImport);
