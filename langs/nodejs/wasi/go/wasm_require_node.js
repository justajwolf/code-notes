// @ts-nocheck

"use strict";

globalThis.require = require;
globalThis.fs = require("fs");
globalThis.TextEncoder = require("util").TextEncoder;
globalThis.TextDecoder = require("util").TextDecoder;

globalThis.performance ??= require("performance");

globalThis.crypto ??= require("crypto");

exports.require = async function (path) {
    require("./wasm_exec");
    const tmpModName = `tmp_${Date.now()}`;
    globalThis[tmpModName] = {};

    const go = new Go();
    go.argv = [tmpModName];
    go.env = Object.assign({ TMPDIR: require("os").tmpdir() }, process.env);
    go.exit = process.exit;

    process.on("exit", (code) => { // Node.js exits if no event handler is pending
        if (code === 0 && !go.exited) {
            // deadlock, make Go print error and stack traces
            go._pendingEvent = { id: 0 };
            go._resume();
        }
    });

    const wasmFileBuf = fs.readFileSync(path);
    const result = await WebAssembly.instantiate(wasmFileBuf, go.importObject)
    go.run(result.instance);
    return globalThis[tmpModName];
}

