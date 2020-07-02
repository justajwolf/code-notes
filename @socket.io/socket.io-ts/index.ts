import * as socketio from 'socket.io';
import * as http from 'http';
const server = http.createServer();
server.on('request', (req, res) =>{
    res.end(req.url);
})
const io = socketio(server);
io.on('connection', socket => {
    socket.join(socket.id);
});
server.listen(3000, () => console.log('listening: 3000...'));
