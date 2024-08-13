import http from "http";
import url from "url";
import fs from 'fs';

import UrlFilter from "./url-filter.js";

export default class HttpServer {
    static createServer() {
        const httpServer = http.createServer((request, response) => {
            let pathname = url.parse(request.url).pathname;
            let realPath = UrlFilter.toRealPath(pathname);
            let exists = fs.existsSync(realPath);
            if (exists) {
                try {
                    file = fs.readFileSync(realPath, "binary");
                    let ext = path.extname(realPath);
                    ext = ext ? ext.slice(1) : "unknown";
                    var contentType = mine[ext] || "text/plain";
                    let header = {
                        "Content-Type": contentType,
                    };
                    response.writeHead(200, header);
                    response.write(file, "binary");
                    response.end();
                } catch (error) {
                    response.writeHead(500, {
                        "Content-Type": "text/plain",
                    });
                    response.end();
                }
            } else {
                response.writeHead(404, {
                    "Content-Type": "text/html",
                });
                response.write("This request URL " + pathname + " was not found on this server.<br>");
                response.write("you can try <a href = '/cbeta/'>index</a>");
                response.end();
            }
        });
        return httpServer;
    }
}
