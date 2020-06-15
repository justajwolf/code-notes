const net = require('net');
const protobuf = require('protocol-buffers');
class SocketServer {
  constructor(options = {}) {
    this.
  }
  createServer(callback) {
    this.server = net.createServer((server) => {
      server.on('data', (buffer) => {
        
      })
    });
    this.server.on('error', (err) => {
      console.error(err);
    });
  }
  listen(port, cbListener) {
    this.listen(parseInt(port), checkCallback(cbListener))
  }
  on(event, cb) {
    this.server.on(event, checkCallback(cb));
  }
}
function checkCallback(cb) {
  return typeof cb === 'function' ? cb : () => {};
}

Promise.all([])