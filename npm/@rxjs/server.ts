import * as http from 'http';
const server = http.createServer();
let count = 0;
server.on('request', async (req, res) => {
  const level = ~~(Math.random()*2) ? 'log' : 'info';
  const log = JSON.stringify({level, timestamp: Date.now(), message: `uid:${++count}`});
  console.log(log);
  if (count >= 2) {
    return setTimeout(() => res.end(log), 3000);
  }
  res.end(log);
});
server.listen(3000, () => console.log(JSON.stringify({level: 'verbose', timestamp: Date.now(), message: 'server starting....'})));