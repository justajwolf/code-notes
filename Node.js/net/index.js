const net = require('net');
const optionsKeys = [
	'conectionTimeout',
	'keepAlive',
	'host',
	'port',
];

const defaultOperate = {
	encode(data) {
		if (Buffer.isBuffer(data)) return data;
		return Buffer.from(data);
	},
	decode(buffer) {
		return buffer;
	}
}

class SocketClient {
	constructor(options = {}) {
		// 核心配置
		this.seq = this.sessionCount= 0; // 序列
		this.context = {};
		this.requestQueue = [];
		this.conectioning = false;
		this.conectioned = false;
		this.socket = null;

		// 传入配置
		this.keepAlive = false;
		this.conectionTimeout = 5000;
		this.host = '';
		this.port = -1;
		this.encode = defaultOperate.encode;
		this.decode = defaultOperate.decode;
		Object.assign(this, optionsKeys.reduce((config, key) => {
			return options[key] && (config[key] = options[key]), config;
		}, {}));
	}

	getSeq() {
		while(this.context[this.seq]) this.seq = ++this.seq % 10000;
		return this.seq;
	}

	init(client) {
		const socket = this.socket = new net.Socket({
			readable: true,
			writable: true,
		});
		socket.setKeepAlive(this.keepAlive);
		let timer = null;
		if (this.conectionTimeout) {
			timer = setTimeout(() => {
				const errMsg = `request timeout ${this.conectionTimeout} ms!`;
				while(this.requestQueue.length) this.requestQueue.pop()(errMsg);
				this.close();
			}, this.conectionTimeout);
		}
		socket.on('error', (err) => {
			timer = timer ? clearTimeout(timer) : null;
			this.errorHandle(err.message);
			this.close();
		});
		socket.on('connect', () => {
			timer = timer ? clearTimeout(timer) : null;
			this.conectioning = false;
			this.conectioned = true;
			while(this.requestQueue.length) this.requestQueue.shift()();
		});
		socket.on('close', () => {
			this.close();
			if(this.requestQueue.length) this.requestQueue.pop()();
		});
		let bufCache = Buffer.concat([]);
		socket.on('data', (buffer) => {
			// 只处理buffer
			if (!Buffer.isBuffer(buffer)) {
				this.errorHandle('receive buffer illegal!');
				return this.socket.end();
			}
			bufCache = Buffer.concat(bufCache, buffer);
			// 循环处理buffer，防止沾包
			while(bufCache.length) {
				// 丢弃，异常数据，初始化cache
				if (bufCache.length < 8) {
					bufCache = Buffer.concat([]);
					break;
				}

				// 取出数据序列和数据长度
				let seq = bufCache.readInt32BE(0);
				let bodyLength = bufCache.readInt32BE(4);
				// 丢弃，超时数据或伪造数据
				if (!this.context[seq]) {
					bufCache = bufCache.slice(bodyLength+8);
					continue;
				}
				const {handle} = this.context[seq];
				handle(null, bufCache.slice(8,bodyLength+8));
				bufCache = bufCache.slice(bodyLength+8);
			}
		});

		socket.connect({
			host: this.host,
			port: this.port,
		});
	}

	async write(data) {
		return new Promise((resolve, reject) => {
			if (!this.socket && !this.conectioned) {
				try {
					this.requestQueue.push(async (err) => {
						if (err) return reject(err);
						resolve(await this.write(data));
					});
					if (!this.conectioning) {
						this.conectioning = true;
						this.init(this);
					}
				} catch (err) {
					reject(err);
				}
				return;
			}

			const nowSeq = this.getSeq();
			const buffer = this.encode(data);
			if (!Buffer.isBuffer(buffer)) {
				return reject("encode illegal!");
			}
			this.context[nowSeq] = {
				seq: nowSeq,
				handle: (err, data) => {
					if (err) {
						return reject(err);
					}
					try {
						resolve(this.decode(data));
					} catch (error) {
						reject(error)
					}
				}
			};
			this.sessionCount++;
			const headBuffer = Buffer.alloc(8);
			headBuffer.writeInt32BE(nowSeq, 0);
			headBuffer.writeInt32BE(buffer.length, 4);
			this.socket?.write(Buffer.concat([headBuffer,buffer]));
		});
	}

	errorHandle(err) {
		for (const [seq, {handle}] of Object.entries(this.context)) {
			if(typeof handle === 'function') handle(err);
			delete this.context[seq];
			this.sessionCount--;
		}
	}

	close() {
		this.socket.destroy();
		this.socket = null;
		this.conectioned = false;
		this.conectioning = false;
	}
}

class SocketServer {
	constructor(options = {}) {
		this.socket = new net.Server();
	}

	listen(port, callback) {

	}
}

module.exports = {
	SocketClient,
	SocketServer
};