import { spawnSync } from 'node:child_process';

export function clientSendMock(request = async () => { }) {
    setTimeout(async () => {
        await request();
        clientSendMock(request);
    }, 1000)
}

export async function curlRequest(url = "http://127.0.0.1:8080") {
    const res = spawnSync(`curl ${url}`, { shell: true, encoding: "utf8" });
    console.log(res.stdout);
}

export async function httpRequest(url = "http://127.0.0.1:8080") {
    const res = await fetch(url);
    const text = await res.text();
    console.log(text)
}

if (import.meta.filename.endsWith(process.argv[1])) {
    const url = process.argv[3] ?? process.argv[2]
    switch (process.argv[2]) {
        case "curl":
            clientSendMock(curlRequest.bind(null, url))
            break;
        default:
            clientSendMock(httpRequest.bind(null, url))
    }
}