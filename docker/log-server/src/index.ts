import * as http from 'http';
const server = http.createServer();
let count = 0;
server.on('request', (req: http.IncomingMessage, res: http.ServerResponse) => {
  const level = ~~(Math.random()*2) ? 'log' : 'info';
  const log = JSON.stringify({level, timestamp: Date.now(), message: `uid:${++count}`});
  console.log(log);
  res.end(log);
});
server.listen(3000, () => console.log(JSON.stringify({level: 'verbose', timestamp: Date.now(), message: 'server starting....'})));
