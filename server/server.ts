import { register } from "node:module"; 
import { pathToFileURL } from "node:url"; 
register("ts-node/esm", pathToFileURL("./"));

import http from "http";
const PORT = 8000;

const httpServer = http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello, world!\n");
});


httpServer.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
