exports.b1 = 'b1';
console.log('4');
const a = require("./circular-a");

console.log('5', a);
exports.b2 = 'b2'
console.log('6', exports);