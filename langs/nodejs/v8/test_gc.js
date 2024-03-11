// 查看gc情况
// node --trace_gc test_gc.js > trace_gc.txt

// 查看执行性能分析指标(https://nodejs.org/en/learn/getting-started/profiling)
// node --prof test_gc.js
// node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > prof.txt

const arr = [];
for (let index = 0; index < 1000000; index++) {
    arr.push(new Array(100));
}