const {exec} = require('child_process');
const logs = [];
const child = exec('cd ../ && npm i grpc', (err, stdout, stderr) => {
  if(err) {
    return console.err(err);
  }
  child.stdout.on('data', (chunk) => {
    logs.push(`${chunk}\n`);
  });
  child.stdout.on('end', () => {
    console.log(logs.length);
    console.log(...logs);
  });
});