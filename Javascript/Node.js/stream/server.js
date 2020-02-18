const http = require('http');
const server = http.createServer((req, res) => {
  req.setEncoding('utf8');
  const dataStack = [];
  req.on('data', (chunkStr) => {
    dataStack.push(chunkStr);
  });
  req.on('end', () => {
    try {
      const obj = JSON.parse(dataStack.join(''));
      res.write(dataStack.join(''));
      res.write('cbh');
      res.end();
    } catch (err) {
      res.statusCode = 400;
      res.end(err.message);
    }
  })
}).listen(8080);
