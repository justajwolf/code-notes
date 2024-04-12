# WASI（WebAssembly System Interface）

## 缘故

从 `node18` 开始，看 node 的更新，以及查看部分原生模块和 loader 代码，能明显的发现 cjs 正在加速成为 legacy，新品 esm 正在成为主流，甚至以后彻底取代 cjs。

前段时间，去了解下 esm 模块的具体加载实现，这块就不具体详细展开了。

基本上就是异步式加载，通过 `import` 和 `from` 关键字(个人理解，像是语法糖，因为还提供 `import()` 函数)，在解析编译时处理导入关系，并且提供运行时的口子，可以使用 `import()` 异步函数去按需加载模块等。

esm 的 loader 中，在使用 wasm 去解析 cjs 模块代码，[见源码位置](https://github.com/nodejs/node/blob/main/lib/internal/modules/esm/translators.js#L386)。

这里的 wasm 来自一个官方提供的包 `cjs-module-lexer`，在 node 目录 `/deps/cjs-module-lexer` 下。 github 仓库地址：[`https://github.com/nodejs/cjs-module-lexer`](`https://github.com/nodejs/cjs-module-lexer`)。

在这之前，也一直没仔细看 `wasm` 和 node 的 `wasi`。

借此契机，本篇分享，围绕 `cjs-module-lexer` 包展开和扩展，去看看 wasm 以及 node 如何接入和使用。

## 窥探 cjs-module-lexer 包

## webassembly 背景

## nodejs 下 wasm 尝试

### nodejs 使用 wasi 接入 wasm 初探

```shell
cd node

# 拉取js的lexer wasm实现
make configure

# 执行demo
make run
```

### nodejs 使用 go 编写 wasm 模块 初探

```shell
cd go

# 拉去依赖文件
make configure

# 执行demo
make run-node
```

## 总结
