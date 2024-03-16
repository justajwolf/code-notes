import http from "node:http"
import net from "node:net"
import * as utils from "../utils.mjs";

const server = http.createServer()
    .on("request", (req, res) => {
        res.end(`from pid ${process.pid}: ${utils.getLocalTimeString()}`)
    });

export const MsgType = {
    tcp: "tcp"
}
process.on("message", (message, /**@type net.Server */sendHandle) => {
    switch (message) {
        case MsgType.tcp: {
            const tcp = sendHandle;
            tcp.on("connection", server.emit.bind(server, "connection"))
            break;
        }
        default:
    }
    console.log(`sub pid ${process.pid}: receive from master process msg ${message}`)
});