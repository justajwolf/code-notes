# WASI（WebAssembly System Interface）

## nodejs 使用 wasi 接入 wasm 初探

```shell
cd node

# 拉取js的lexer wasm实现
./configure.sh

# 执行demo
node wasi.mjs
```

## nodejs 执行 go 编写 wasm 模块 初探

```shell
cd go

# 拉去依赖文件
./configure.sh

# 执行demo
node wasi.js
```
