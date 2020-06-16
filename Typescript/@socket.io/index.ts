import * as socketio from 'socket.io';
import * as http from 'http';
const server = http.createServer();
const io = socketio(server);
io.on('connection', client => {

});
server.listen(3000, () => console.log('listening: 3000...'));