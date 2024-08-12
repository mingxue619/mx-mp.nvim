import { attach } from "neovim";
import http from "http";
import fs from "fs";

const PORT = 8000;

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, world!\n");
});

const filePath = "/home/ad/github/mingxue619/mx-md.nvim/log";
const servername = process.argv[2];
const nvim = attach({
    socket: servername,
});
nvim.command("vsp");
const windows = await nvim.windows;
console.log(windows.length);
nvim.on("request", (method, args, resp) => {
    // console.log(method);
    fs.writeFileSync(filePath, "request\n");
    fs.appendFileSync(filePath, method);
    // if (method === 'send_message') {
    // }
    resp.send();
});
nvim.on("notification", (method, args, resp) => {
    // console.log(method);
    fs.writeFileSync(filePath, "notification\n");
    fs.appendFileSync(filePath, method);
    // if (method === 'send_message') {
    // }
    resp.send();
});
let channelId = await nvim.channelId;
await nvim.setVar("mxmd_node_channel_id", channelId);
server.listen(PORT, async () => {
    // nvim.command("vsp | vsp | vsp");
    // const windows = await nvim.windows;
    // console.log("================" + windows.length);
    console.log(`Server is running on http://localhost:${PORT}`);
    // const buffer = await nvim.buffer;
});
