const os = require("os");

exports.showMem = function () {
    const { rss, heapTotal, heapUsed } = process.memoryUsage();
    const format = (bytes) => `${(bytes / 1024 / 1024 / 1024).toFixed(3)}GB`;
    console.log(`Process: System Memory ${format(os.totalmem())}/${format(os.freemem())}\theapTotal ${format(heapTotal)} heapUsed ${format(heapUsed)} rss ${format(rss)}`);
    console.log('-----------------------------------------------------------');
}