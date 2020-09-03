const fs = require('fs');
const buffer = require('buffer').Buffer;

// 生成 data URI
const mime = 'image/png';
const encoding = 'base64';
const base64Data = fs.readFileSync(`${__dirname}/monkey.png`).toString(encoding);
const uri = `data:${mime};${encoding},${base64Data}`;
console.log(uri);

// data URI 转文件
const uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...';
const base64Data = uri.split(',')[1];
const buf = buffer.from(base64Data, 'base64');
fs.writeFileSync(`${__dirname}/secondmonkey.png`, buf);