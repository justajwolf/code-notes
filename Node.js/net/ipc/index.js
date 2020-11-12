const net = require('net');
const path = require('path');
const ipc_path = (() => {
  switch(process.platform) {
    case 'win32':
      return path.join('\\\\?\\pipe', __dirname, `${path.parse(__filename).name}-${Date.now()}`);
    case 'darwin':
    case 'linux':
      return path.join(__dirname, `${path.parse(__filename).name}-${Date.now()}.sock`);
    default: return '';
  }
})();

if (!ipc_path) {
  console.error('ipc_path unknown!!');
  process.exit(-1);
}

// tcp server
net.createServer(socket => {
  socket.on('data', data => {
    console.log(`from client: ${data.toString()}`);
  }).on('end', () => {
    console.log('server disconnected to client');
  })
  socket.pipe(socket);
}).listen(ipc_path, () => console.log(`Listening ipc_path: ${ipc_path}`));

// tcp client
const client = net.createConnection({path: ipc_path}, () => {
  client.write('changbaihe');
})
.on('data', data => {
  console.log(`from server: ${data.toString()}`);
}).on('end', () => {
  console.log('client disconnected from server.')
});