const {format} = require('util');
const {writeFileSync} = require('fs');
const {
  createHook,
  executionAsyncId,
  executionAsyncResource,
} = require('async_hooks');

const logs = [];
const log = (...args) => logs.push(format(...args));
log(executionAsyncId(), executionAsyncResource())
createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    log('parent', triggerAsyncId, 'init', asyncId, type, resource);
  },
  before(asyncId) {
    log('before', asyncId);
  },
  after(asyncId) {
    log('after', asyncId);
  },
  destroy(asyncId) {
    log('destory', asyncId);
  },
  promiseResolve(asyncId) {
    log('promiseResolve', asyncId);
  },
}).enable();

async function entry() {
  log('----entry', executionAsyncId());
  const tmp = middle();
  log('----entry----', executionAsyncId());
  return tmp;
}
async function middle() {
  log('----middle', executionAsyncId());
  const tmp = new Promise((resolve, reject) => {
    log('----middle-new-promise', executionAsyncId());
    resolve('first');
  });
  log('----middle----', executionAsyncId());
  return tmp;
}
entry().then(res => {
  log(res);
  log('----first', executionAsyncId());
  return 'second';
}).then(res => {
  log(res);
  log('----second', executionAsyncId());
  writeFileSync(`${__dirname}/log.txt`, logs.join('\n'));
  return 'end';
});