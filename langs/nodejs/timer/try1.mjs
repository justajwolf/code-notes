/**
 * 测试 setTimeout，setImmediate，process.nextTick 以及 promise微任务 执行顺序
 */

setTimeout(() => console.log(1), 0);
setImmediate(() => console.log(2));

process.nextTick(() => console.log(3));

Promise.resolve(0).then((v) => console.log(v));