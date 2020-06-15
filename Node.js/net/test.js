const fs = require('fs');
const path = require('path');
const protobuf = require('protocol-buffers');
const pbPath = path.join(__dirname,'../../ProtocolBuffers/detail.proto');
// const schema = protobuf.toJS(fs.readFileSync(pbPath));
// fs.writeFileSync(`${__dirname}/deatil.js`,schema);
function tokenize (sch) {
  var noComments = function (line) {
    var i = line.indexOf('//')
    return i > -1 ? line.slice(0, i) : line
  }

  var noMultilineComments = function () {
    var inside = false
    return function (token) {
      if (token === '/*') {
        inside = true
        return false
      }
      if (token === '*/') {
        inside = false
        return false
      }
      return !inside
    }
  }

  var trim = function (line) {
    return line.trim()
  }

  return sch
    .replace(/([;,{}()=:[\]<>]|\/\*|\*\/)/g, ' $1 ')
    .split(/\n/)
    .map(trim)
    .filter(Boolean)
    .map(noComments)
    .map(trim)
    .filter(Boolean)
    .join('\n')
    .split(/\s+|\n+/gm)
    .filter(noMultilineComments())
}

const tokens = tokenize(fs.readFileSync(pbPath).toString());
console.log();