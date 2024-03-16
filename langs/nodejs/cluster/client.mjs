import { spawnSync } from 'node:child_process';

export function clientSendMock(request = async () => { }) {
    setTimeout(async () => {
        await request();
        clientSendMock(request);
    }, 1000)
}

export async function curlRequest(url = "http://127.0.0.1:8080") {
    const res = spawnSync(`curl ${url}`, { shell: true, encoding: "utf8" });
    const content = res.stdout.trim() || res.stderr.trim() || `${res.pid},${res.status}`;
    console.log(content);
}

export async function httpRequest(url = "http://127.0.0.1:8080", type = "fetch") {
    switch (type) {
        case "fetch": {
            // 这种方式，每次请求连接总是在同一个进程上处理，后面有时间了，看看这个具体原因吧，fetch底层实现可能有连接优化。
            const res = await fetch(url);
            const text = await res.text();
            console.log(text)
            return;
        }
        case "spawn":
        default: {
            // 这种方式，在cluster模式下，使用spawnSync，竟然没反应。。。后面有时间了，仔细看看啥原因吧，估计cluster模式对所有子进程都有拦截吧。
            const cmd = `await fetch('${url}').then(async (res) => console.log(await res.text()));`
            const res = spawnSync(`node --input-type module -e "${cmd}"`, { shell: true, encoding: "utf8" });
            const content = res.stdout.trim() || res.stderr.trim() || `${res.pid},${res.status}`;
            console.log(content);
            return;
        }
    }
}

if (import.meta.filename.endsWith(process.argv[1])) {
    const url = process.argv[3] ?? process.argv[2]
    switch (process.argv[2]) {
        case "curl":
            clientSendMock(curlRequest.bind(null, url))
            break;
        default:
            clientSendMock(httpRequest.bind(null, url, "spawn"))
    }
}