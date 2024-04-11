// @ts-nocheck

"use strict";
const fs = require("fs");

// globalThis.require = require;
// globalThis.fs = fs;
// globalThis.TextEncoder = require("util").TextEncoder;
// globalThis.TextDecoder = require("util").TextDecoder;

// globalThis.performance ??= require("performance");

// globalThis.crypto ??= require("crypto");

exports.load = async function (path, modname) {
    require("./wasm_exec");
    const go = new Go();

    modname ??= `tmp_modname_${Date.now()}_${~~(Math.random() * 100)}`;
    go.argv = [modname];

    go.env = Object.assign({ TMPDIR: require("os").tmpdir() }, process.env);
    go.exit = process.exit;

    let _exit;
    process.on("exit", (code) => { // Node.js exits if no event handler is pending
        if (code === 0 && !go.exited) {
            // 优先考虑用，自己提供的退出
            if (typeof _exit === "function") {
                _exit(modname);
                return;
            }
            // deadlock, make Go print error and stack traces
            go._pendingEvent = { id: 0 };
            go._resume();
        }
    });

    const wasmFileBuf = fs.readFileSync(path);
    const result = await WebAssembly.instantiate(wasmFileBuf, go.importObject)

    // 这里不能用await，因为go执行是阻塞，await之后就不往下执行了
    go.run(result.instance).catch(console.error);

    // 为了保证，globalThis[modname]，被导出成功，这块强制异步，等go.run执行到阻塞地方。
    await require("timers/promises").setImmediate()

    _exit = globalThis[modname]?._exit;
    if (_exit) {
        delete globalThis[modname]._exit;
    }
    return globalThis[modname];
}

