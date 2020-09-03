const EventEmitter = require('events').EventEmitter;

const AudioDevice = {
    play: function (track) {
        console.log('play', track);
    },
    stop: function () {
        console.log('stop');
    },
};

class MusicPlayer extends EventEmitter {
    constructor() {
        super();
        this.playing = false;
    }
}

const musicPlayer = new MusicPlayer();
musicPlayer.on('play', function (track) {
    this.playing = true;
    AudioDevice.play(track);
});
musicPlayer.on('stop', function () {
    this.playing = false;
    AudioDevice.stop();
});

musicPlayer.emit('play', 'The Roots - The Fire');
setTimeout(function () {
    musicPlayer.emit('stop');
}, 1000);

// 处理异常
// EventEmitter 实例发生错误会发出一个 error 事件
// 如果没有监听器，默认动作是打印一个堆栈并退出程序
musicPlayer.on('error', function (err) {
    console.err('Error:', err);
});