const net = require('net');
const path = require('path');
const fs = require('fs');
const ipc_path = (() => {
  switch(process.platform) {
    case 'win32':
      return path.join('\\\\?\\pipe', __dirname, `net-ipc-${path.parse(__filename).name}`);
    case 'darwin':
    case 'linux':
      const sock = path.join(__dirname, `net-ipc-${path.parse(__filename).name}.sock`);
      fs.existsSync(sock) && fs.unlinkSync(sock);
      return sock;
    default: return '';
  }
})();

if (!ipc_path) {
  console.error('ipc_path unknown!!');
  process.exit(-1);
}

// tcp server
net.createServer(socket => {
  // socket.setNoDelay(true);
  socket.on('data', data => {
    console.log(`from client: ${data.toString()}`);
    socket.write(data);
  }).on('end', () => {
    console.log('server disconnected to client');
  })
  // socket.pipe(socket);
}).listen(ipc_path, () => console.log(`Listening ipc_path: ${ipc_path}`));

// tcp client
const client = net.createConnection({path: ipc_path}, () => {
  client.end('changbaihe');
})
.on('data', data => {
  console.log(`from server: ${data.toString()}`);
}).on('end', () => {
  console.log('client disconnected from server.')
});