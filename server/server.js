import { attach } from "neovim";
import http from "http";
import fs from "fs";
import WebSocket from "./websocket.js";
// import Nvim from './nvim.js';
const PORT = 8000;
const servername = process.argv[2];


const httpServer = http.createServer((request, response) => {
    // let pathname = filter.httpFilter(request, response);
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello, world!\n");
});

const ws = new WebSocket(httpServer);
// const nvim = new Nvim(servername);
// ws.setupListeners(1);
// nvim.setupListeners(ws);
// import WebSocket from 'ws';

httpServer.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
