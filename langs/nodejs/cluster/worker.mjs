import http from "node:http"
import * as utils from "../utils.mjs";

const server = http.createServer().listen(8080)
    .on("request", (req, res) => {
        res.end(`from pid ${process.pid}: ${utils.getLocalTimeString()}`)
    })
    .on("listening", () => {
        console.log(`sub pid ${process.pid} is listening ${JSON.stringify(server.address())}`);
    });