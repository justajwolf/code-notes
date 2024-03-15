import os from "node:os";
import path from 'node:path';
import cluster from 'node:cluster';
import { clientSendMock, httpRequest } from './client.mjs';

cluster.schedulingPolicy = cluster.SCHED_RR;
cluster.setupPrimary({
    exec: path.resolve(import.meta.dirname, "./worker.mjs")
})

for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
}

if (import.meta.filename.endsWith(process.argv[1]) && process.argv[2] === "test") {
    clientSendMock(httpRequest);
}