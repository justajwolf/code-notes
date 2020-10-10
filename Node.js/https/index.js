const https = require('https');
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

// https.get('https://raw.githubusercontent.com/uiwjs/province-city-china/master/dist/level.json', res => {
//   console.log(res.statusCode, res.headers);
//   let data = '';
//   res.on('data', chunk => data += chunk);
//   res.on('end', () => {
//     console.log(data);
//   });
// }).on('error', console.error);
