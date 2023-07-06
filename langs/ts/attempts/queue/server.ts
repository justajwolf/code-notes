import { task } from "./queue.demo";
import * as http from "http";
const server = http.createServer();
let count = 1;
server.on("request", async (req, res) => {
  const r = await task(count++);
  console.log(r);
  res.end(`${r}`);
});
server.listen(3000, () => console.log("listening: 3000..."));
