import dgram from "node:dgram";

// server
const endpoint = dgram.createSocket("udp4");
endpoint.bind(41234);
endpoint.on("message", (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    endpoint.send("world (from server)", 41235, (err, bytes) => {
        if (err) {
            console.error(`server error:\n${err?.stack}`);
        } else {
            console.log(`server send ok: ${bytes} bytes`);
        }
    })
});
endpoint.on("listening", () => {
    const address = endpoint.address();
    console.log(`server listening ${address.address}:${address.port}`);
});
endpoint.on("error", (err) => {
    console.error(`server error:\n${err.stack}`);
    endpoint.close();
});

// client
const client = dgram.createSocket("udp4");
client.bind(41235)
client.on("message", (msg, rinfo) => {
    console.log(`client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});
client.on("listening", () => {
    const address = client.address();
    console.log(`client listening ${address.address}:${address.port}`);
});
client.on("error", (err) => {
    console.error(`client error:\n${err.stack}`);
    client.close();
});

// test
setTimeout(() => {
    client.send("hello (from client)", 41234, (err, bytes) => {
        if (err) {
            console.error(`client error:\n${err?.stack}`);
        } else {
            console.log(`client send ok: ${bytes} bytes`);
        }
    })
}, 1000);