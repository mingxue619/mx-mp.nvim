import { attach } from "neovim";
import http from "http";
import fs from "fs";
import PageWebSocket from "./page-websocket.js";
import MarkdownNvim from './markdown-nvim.js';
const PORT = 8000;
const servername = process.argv[2];

const httpServer = http.createServer((request, response) => {
    // let pathname = filter.httpFilter(request, response);
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello, world!\n");
});

const pws = new PageWebSocket(httpServer);
const mdn = new MarkdownNvim(servername);
pws.setupListeners(mdn);
mdn.setupListeners(pws);

httpServer.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
