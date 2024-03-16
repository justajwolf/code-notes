import net from "node:net";
import os from "node:os";
import cp from "node:child_process";

const server = net.createServer().listen(8081)
    .on("close", console.log.bind(null, `master pid ${process.pid}: all subs have started & server has closed`));


const childs = {};
for (let i = 0; i < os.cpus().length; i++) {
    const sub = cp.fork("./worker.mjs")
        .on("message", (message, sendHandle) => {
            console.log(`master pid ${process.pid}: receive from sub pid ${sub.pid} msg ${message}`)
        })
        .on("error", console.error)
        .on("exit", (code) => {
            console.log(`master pid ${process.pid}: receive from sub pid ${sub.pid} code ${code}`)
        });
    sub.send("tcp", server);

    childs[sub.pid] = sub;
}

process
    .on("exit", (code) => {
        for (const sub of Object.values(childs)) {
            sub.emit("exit", code);
        }
    })
    .on("SIGINT", (signal) => {
        console.log(`master pid ${process.pid}: received SIGINT`)
        process.exit(-1)
    });

/**
 * 当前master的server必须close掉，原因如下：
 * 1. master进程，主要负责发起服务listen，然后将tcp的句柄，共享给sub进程使用
 * 2. 如果master，还在不关闭的话，收到和sub进程一样，收到socket请求
 * 3. 因为master的server，我们并没有监听"connection"事件，所以因为master没有处理socket的能力，默认会关闭掉每次收到的socket，这样会导致，丢失请求
 */
server.close();
