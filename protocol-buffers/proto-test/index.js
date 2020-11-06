const path = require('path');
const pbCompiler = require('google-protobuf');
const pb = require('protobufjs');
// const root = pb.loadSync(path.join(__dirname, './detail.proto'));
const pb2 = require('@grpc/proto-loader');
const root = pb2.loadSync(path.join(__dirname, './detail.proto'));
console.log(JSON.stringify(root.toJSON(), null, ' '));