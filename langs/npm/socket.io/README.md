Socket.IO内置了一些默认事件，我们在设计事件的时候应该避开默认的事件名称，并灵活运用这些默认事件。

服务器端事件：

io.sockets.on(‘connection’, function(socket) {})：socket连接成功之后触发，用于初始化
socket.on(‘message’, function(message, callback) {})：客户端通过socket.send来传送消息时触发此事件，message为传输的消息，callback是收到消息后要执行的回调
socket.on(‘anything’, function(data) {})：收到任何事件时触发
socket.on(‘disconnect’, function() {})：socket失去连接时触发（包括关闭浏览器，主动断开，掉线等任何断开连接的情况）
客户端事件：

connect：连接成功
connecting：正在连接
disconnect：断开连接
connect_failed：连接失败
error：错误发生，并且无法被其他事件类型所处理
message：同服务器端message事件
anything：同服务器端anything事件
reconnect_failed：重连失败
reconnect：成功重连
reconnecting：正在重连
在这里要提下客户端socket发起连接时的顺序。当第一次连接时，事件触发顺序为：
  connecting->connect；当失去连接时，事件触发顺序为：disconnect->reconnecting（可能进行多次）->connecting->reconnect->connect。