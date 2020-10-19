const https = require('https');
const test1 = () => {
  const req = https.request(
    {
      hostname: 'raw.githubusercontent.com',
      port: 443,
      path: '/uiwjs/province-city-china/master/dist/level.json',
      method: 'GET',
    },
    res => {
      console.log(res.statusCode, res.headers);
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(data);
      })
    },
  ).on('error', console.error);
  req.end();
}
const test2 = () => {
  https.get('https://raw.githubusercontent.com/uiwjs/province-city-china/master/dist/level.json', res => {
    console.log(res.statusCode, res.headers);
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(data);
    });
  }).on('error', console.error);
}

const http = require('http');
http.createServer((req, res) => {
  https.get('https://ea5765b0c8415a76e7dc6503099ed150.dlied1.cdntips.net/dlied1.qq.com/qqweb/PCQQ/PCQQ_EXE/PCQQ2020.exe?mkey=5f815d392be3dac7&f=8507&cip=43.227.252.50&proto=https&access_type=$header_ApolloNet', r => {
    console.log(r.statusCode, r.headers);
    let data = '';
    // res.on('data', chunk => data += chunk);
    // res.on('end', () => {
    //   console.log(data);
    // });
    res.setHeader('Content-Disposition', 'attachment; filename="test.exe"');
    res.setHeader('content-type', r.headers['content-type']);
    r.pipe(res);
  }).on('error', console.error);
}).listen(3000, () => console.log('ok'));