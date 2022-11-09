const {promisify} = require('util');
const {exec} = require('child_process');
const { stderr } = require('process');
const cmd = 'pwd && npm i @types/node';
test3();
async function test1() {
  exec(cmd, (err, stdout, stderr) => {
    if(err) {
      return console.err(err);
    }
    process.stdout.write(`--------------------\n${stdout}`);
  }).stdout.on('data', (chunk) => console.log(`+++++++++++++++++\n${chunk}`)).on('end', () => console.log('end'));
}

async function test2()  {
  const logs = [];
  const child = exec(cmd);
  child.stdout
  .on('data', (chunk) => {
    logs.push(`${chunk}\n`);
  })
  .on('end', () => {
    console.log(logs.length);
    console.log(...logs);
  });
}

async function test3()  {
  return promisify(exec)(cmd)
  .then(({stdout, stderr}) => process.stdout.write(stdout))
  .catch(console.err);
}