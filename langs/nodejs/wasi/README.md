# WebAssembly => wasm/wat/wit/wasi

从 `node18` 开始，看 node 的更新，以及查看部分原生模块和 loader 代码，能明显的发现 `cjs` 正在加速成为 legacy，新品 `esm` 正在成为主流，甚至以后彻底取代 `cjs。`

前段时间，去了解下 `esm` 模块的具体加载实现，这块就不具体详细展开了。

通过 `import` 和 `from` 关键字(个人理解，像是语法糖，因为还提供 `import()` 动态函数)，在解析编译时处理导入的模块，我们也可以在运行时，使用 `import()` 异步函数去按需加载模块。

在 `esm` 的 loader 中，有在使用 `wasm` 去解析 cjs 模块代码，提取 exports 的 keys，用于兼容cjs模块，[见源码位置](https://github.com/nodejs/node/blob/main/lib/internal/modules/esm/translators.js#L386)。

这里的 wasm 来自一个官方提供的包 `cjs-module-lexer`，在 `node` 目录 `/deps/cjs-module-lexer` 下。

在这之前，也一直没咋关注过 `wasm` 和 `node` 的 `wasi`，借此契机，好好了解一下。

本篇分享，围绕 `cjs-module-lexer` 包示例，展开探索，去看看 `wasm` 当前情况，以及 如何 在 node 和 浏览器中接入和使用。

## [cjs-module-lexer](https://github.com/nodejs/cjs-module-lexer)

这里简单介绍一下这个包。

这是一个 js 语法分词器，对js模块进行分词，按照 cjs 的规则，提取出来，所有 exports 上的 keys，以及间接导出的模块的名。

这里，提供了两个版本的实现：

- 纯js的实现，为了兼容不支持 `WebAssembly` 的运行时。

- 核心由 c 来实现，编译成 wasm 格式，以 `data:url` 形式，嵌入到了 js 文件中，最终在 js 代码中，借助 `WebAssembly` api 去接入。

> 对 lexer 感兴趣的小伙伴，可以去瞅瞅这个实现。

从这里，我们可以看到 node 中的 一个 `WebAssembly` 的实际应用。

此外，这个包，给出的 纯 `js` 实现 和 使用 `wasm` 之后的 性能对比，[详见](https://github.com/nodejs/node/tree/main/deps/cjs-module-lexer#benchmarks)，从这个对比看，除了load速度慢了一些，确实比js快，差不多得1倍甚至更多。

参考这个例子，可以考虑，对于 一些必要的 计算型任务，可以尝试使用，基本的 `wasm` 介入了。

## [WebAssembly](https://webassembly.org/)

目前，各大主流浏览器 和 node 都已支持 `WebAssembly` 的 api，[详见](https://developer.mozilla.org/zh-CN/docs/WebAssembly/JavaScript_interface#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)。可以看到，自 node18 之后，对 `WebAssembly` 的 api 支持程度挺高了。

`WebAssembly` 的模块结构，主要由三部分组成，和 常规的 `js` 模块类似：
  
- `import`：来自外界环境的传入，`wasi` 主要使用的就是这个

- 内部实现：数据计算，函数定义等

- `export`：导出 api

先贴文档：

- [官方文档](https://webassembly.org/getting-started/developers-guide/)

- [mdn 文档](https://developer.mozilla.org/zh-CN/docs/WebAssembly)，这的 `WebAssembly` 列的也挺详细。

这里从三个方向，简单介绍一下 `WebAssembly`：

- `WebAssembly` 是什么 ?

  - 从名字上拆解来看，是 web + assembly，web 大家都清楚，assembly 是汇编，熟悉汇编的应该都不陌生(汇编性能最好，接近机器语言)，这么看，`WebAssembly` 就是web上的汇编了。

  - `WebAssembly` 是用于 web 方向的二进制编码方式，类似汇编，为了使 web 性能接近原生，所被设计出来了。

  - `WebAssembly` 简写 `wa`，还有4个相关简写：

    - `wasm`：`WebAssembly` 的二进制格式简称, 由 w + asm 组成, asm 是汇编文件扩展名。

    - `wat`：`WebAssembly` 的文本格式简称，由 wa + t 组成，t 为 text 文本。

    - `wit`：[`Wasm Interface Type`](https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md)

    - `wasi`： `WebAssembly System Interface`，下面会详说。

- 如何使用 `WebAssembly` ?

  - 目前主流浏览器，会全局提供一个叫 `WebAssembly` 的对象，封装的有加载和调用 wasm 的 api，可以直接使用

    - 如 `cjs-modeule-lexer` 中的使用，[详见](https://github.com/nodejs/cjs-module-lexer/blob/main/src/lexer.js#L113,L117)。

    - `官方文档的 js api 示例`，[详见](https://webassembly.org/getting-started/js-api/)。

  - 浏览器以外，有些语言专门提供了 `wasi（WebAssembly System Interface）`, 可以直接使用提供的 wasi，与该语言进行交互。

- 如何编写 `WebAssembly` 模块(wasm) ?

  - `WebAssembly` 模块，提供有 text 格式，可纯手写，编写质感有点麻，[语法和文档见](https://webassembly.github.io/spec/core/text/index.html)。

    - 输出一个文本文件，扩展名一般为 `.wat`，也就是标题中的 `wat`。

    - 使用[工具](https://webassembly.org/getting-started/advanced-tools/)，将 `.wat` 文件，编译成 `wasm`(wat 和 wasm 可逆)。

  - 由其它语言编写具体业务逻辑，编译输出成 `wasm`，具体看文档介绍，这里主要提一下这4个：

    - [C/C++](https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm)

    - [Rust](https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm)

    - [AssemblyScript](https://www.assemblyscript.org/)

      - A TypeScript-like language for WebAssembly，对于熟悉 ts 的人来说，特别友好。

    - [Golang](https://github.com/golang/go/wiki/WebAssembly)

      - 目前主要是使用 [syscall/js](https://pkg.go.dev/syscall/js) 这个原生库。

      - `syscall/js` 这个库，也是基于 go 的 `wasi` 封装的。

## [WASI](https://github.com/WebAssembly/WASI)

这里从两个方向，简单介绍一下 `wasi`：

- [`wasi`](https://github.com/WebAssembly/WASI?tab=readme-ov-file#webassembly-system-interface) 是什么？

  - `wasi` 是 WebAssembly System Interface 的缩写，是系统接口，如前面的名字直译。

  - `wasi` 是专门为运行环境，提供的一套交互接口定义(默认由从环境提供，内部由 `import` 获取)，用于更好的与运行环境交互，更丝滑的输出满足环境要求的 `wasm`
  
    - 因为运行 `wasm` 的环境是不确定的，但是能确定的是，`wasm` 如何与环境交互，可以明确定义如何与外界交互，无论在怎么样的环境下，只要实现这套api，就都可以无缝集成已有的 `wasm` 。

      - 如：定义 `wasm` 中如何从运行环境中，获取网络api， 文件api等

  - `wasi` 也是为更好的以模块的形式输出 `wasm`，提供规范和基础。

- `wasi` 有哪些 api 规范？

  - 官方文档介绍，目前总共有这三版本：

    - preview0:

      - import-module-name：`wasi_unstable`

      - 看文档介绍，这个版本存在时间过短，早早就直接到 preview1 了。

    - [preview1](https://github.com/WebAssembly/WASI/blob/main/legacy/README.md)

      - import-module-name：`wasi_snapshot_preview1`

      - 目前最新的提议都在 `preview2` 上进行者，这版本被归为legacy版本。

      - 这个版本也是目前用的最多，甚至已经被用到生产环境。

      - `node` 的 `wasi` 目前就支持这个版本，但是 `wasi` 还处于试验阶段，[详见文档](https://nodejs.org/dist/latest-v20.x/docs/api/wasi.html)，下面有具体示例。

    - [preview2](https://github.com/WebAssembly/WASI/blob/main/preview2/README.md)

      - 这版目前还处于提案阶段，内容很丰富，也很哇塞，也很让人期待~

      - 这里不做过多描述，有兴趣，可以使用下面提到的 `wasmtime`，进行体验。

  - 也可以参考 [Bytecode Alliance](https://github.com/bytecodealliance) 的文档。
  
    - [wasmtime](https://github.com/bytecodealliance/wasmtime)
  
      - `wasm` 的一个运行时，可以直接执行 `wasm`。
  
    - [WASI.dev](https://wasi.dev/interfaces)

## Nodejs 下 wasm 尝试

### 使用 wasi 接入 wasm 初探

```shell
cd node

# 拉取js的lexer wasm实现
make configure

# 执行demo
make run
```

### 使用 go 编写 wasm 模块 初探

```shell
cd go

# 拉去依赖文件
make configure

# 执行demo
make run-node
```

## 总结
