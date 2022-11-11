#!/usr/bin/env node
"use strict";
const https = require("https");
const fs = require("fs");
const request = async (url, isStream) => new Promise((resolve, reject) => {
    https.request(url, { method: "get", headers: { "user-agent": "Awesome-Octocat-App" } }, res => {
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
const cdn = (url) => {
    if (!url) return [];
    const pathname = new URL(url).pathname.split('/');
    const user = pathname[1];
    const repo = pathname[2];
    const branch = pathname[3];
    const filename = pathname[pathname.length - 1];
    const path = pathname.slice(4).join('/');
    return [filename, `https://cdn.jsdelivr.net/gh/${user}/${repo}@${branch}/${path}`];
}
const saveFiles = async (path, url) => {
    const res = await request(url, true);
    return fs.promises.writeFile(path, res);
}

const args = process.argv.slice(2);
const version = args[0] ?? "master";
const dcUrl = `https://cdn.jsdelivr.net/gh/apache/superset@${version}/docker-compose-non-dev.yml`
const scriptUrl = "https://api.github.com/repos/apache/superset/contents/docker";
const dcFilename = "docker-compose.yaml";
(async () => {
    const dirJSON = await request(scriptUrl);
    /** @type any[] */
    const queue = JSON.parse(dirJSON).map(dir => ((dir["_dirname_"] = "docker"), dir));
    const dirSet = new Set(["docker"]);
    const dUrls = [];
    while (queue.length) {
        const file = queue.shift();
        const dirname = file["_dirname_"];
        const cdnUrl = cdn(file.download_url);
        if (cdnUrl.length) {
            if (dirname) {
                cdnUrl[0] = `${dirname}/${cdnUrl[0]}`;
                dirSet.add(dirname);
            }
            dUrls.push(cdnUrl);
            continue;
        }
        const subDirJSON = await request(file.url);
        /** @type any[] */
        const subFiles = JSON.parse(subDirJSON);
        subFiles?.forEach(subFile => {
            subFile["_dirname_"] = dirname ? `${dirname}/${file.name}` : file.name;
            queue.push(subFile);
        });
    }
    fs.existsSync(dcFilename) && fs.rmSync(dcFilename);
    Array.from(dirSet).forEach(dir => {
        fs.existsSync(dir) && fs.rmSync(dir, { recursive: true });
        fs.mkdirSync(dir);
    })
    const tasks = dUrls.map(async ([filename, url]) => saveFiles(filename, url));
    tasks.push(saveFiles(dcFilename, dcUrl))
    await Promise.all(tasks);
})()