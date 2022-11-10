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
    const scriptInfos = await request(scriptUrl);
    const dUrls = JSON.parse(scriptInfos).map(info => cdn(info.download_url));
    fs.existsSync(dcFilename) && fs.rmSync(dcFilename);
    fs.existsSync("docker") && fs.rmSync("docker", { recursive: true });
    fs.mkdirSync("docker");
    const tasks = dUrls.map(async ([filename, url]) => {
        if (!url) return;
        return saveFiles(`docker/${filename}`, url);
    });
    tasks.push(saveFiles(dcFilename, dcUrl))
    await Promise.all(tasks);
    console.log("ok");
})()