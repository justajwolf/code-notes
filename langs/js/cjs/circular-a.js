exports.a1 = 'a1';
console.log('1');
const b = require("./circular-b");

console.log('2', b.b1);
exports.a2 = 'a2'
console.log('3', exports.a1);