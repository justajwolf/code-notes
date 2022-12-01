#!/usr/bin/env node
"use strict";

/** 
 * exec example1: ./fetch-github-file.js https://raw.githubusercontent.com/justajwolf/nodejs/main/README.md --out=./demo.md
 * result:  demo.md
 * 
 * exec example2: ./fetch-github-file.js https://raw.githubusercontent.com/justajwolf/nodejs/main/README.md --dir=./
 * result:  README.md
 * 
 * append dns config in /etc/hosts: 
 *  185.199.109.133 raw.githubusercontent.com
 * 
*/

Promise
    .resolve(process.argv.slice(2))
    .then(async (args) => {
        const url = args[0] || "https://cdn.jsdelivr.net/gh/justajwolf/nodejs@main/README.md";
        if (!url) {
            console.warn(`[${new Date().toISOString()}] warn: url is ${url}`);
            return;
        }
        args = args.slice(1);
        const flagMap = args.reduce((map, f) => {
            const [k, v] = f.split("=");
            k && map.set(k, v || true);
            return map;
        }, new Map());
        const [filename, cdnUrl] = cdn(url);
        const dir = flagMap.get("--dir");
        const out = flagMap.get("--out");
        const useCDN = flagMap.get("--cdn");
        const path = require("path").resolve(process.cwd(), dir ? `${dir}${dir[dir.length - 1] === "/" ? "" : "/"}${filename}` : (out || filename));
        await saveFiles(path, useCDN ? cdnUrl : url);
        console.log("fetch success:", path);
    });

function cdn(url) {
    if (!url) return [];
    const pathname = new URL(url).pathname.split("/");
    const user = pathname[1];
    const repo = pathname[2];
    const branch = pathname[3];
    const filename = pathname[pathname.length - 1];
    const path = pathname.slice(4).join("/");
    return [filename, `https://cdn.jsdelivr.net/gh/${user}/${repo}@${branch}/${path}`];
}

async function saveFiles(path, url) {
    const [err, res] = await request(url, true).then(res => [, res]).catch(err => [err]);
    if (err) {
        console.error(err);
        return;
    }
    return require("fs").promises.writeFile(path, res);
}

async function request(url, isStream) {
    return new Promise((resolve, reject) => {
        require("https").request(url, { method: "get", headers: { "user-agent": "Awesome-Octocat-App" } }, res => {
            if (res.statusCode === 301) {
                return request(res.headers.location, isStream).then(resolve, reject);
            }
            if (isStream) {
                return resolve(res);
            }
            let data = "";
            res.on("data", chunk => data += chunk);
            res.on("end", () => {
                resolve(data);
            });
        }).on("error", reject).end();
    });
}