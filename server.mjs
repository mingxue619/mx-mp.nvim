import { attach, findNvim } from "neovim";
import * as child_process from "node:child_process";
import http from "http";

const PORT = 8000;

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, world!\n");
});

const nvim_pid = process.argv[2];
server.listen(PORT, async () => {
    const nvim = attach({ proc: nvim_pid });
    // nvim.command("vsp | vsp | vsp");
    // const windows = await nvim.windows;
    // console.log("================" + windows.length);
    console.log(`Server is running on http://localhost:${PORT}`);
    // const buffer = await nvim.buffer;
});
