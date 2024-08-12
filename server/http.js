const config = require('config');
const http = require('http');
const fs=require('fs');
const os=require('os');
const path=require('path');
const mine=require('./mine').types;
const filter = require('./filter');
const port = config.server.port;
let server = http.createServer(function (request, response) {
    let pathname = filter.httpFilter(request, response);
    if (pathname == false){
        return;
    }
    let real_path = filter.pathNameFilter(pathname);
    let exists = fs.existsSync(real_path);
    if(exists){
        try{
            file = fs.readFileSync(real_path,'binary');
            let ext = path.extname(real_path);
            ext = ext ? ext.slice(1) : 'unknown';
            var contentType = mine[ext] || "text/plain";
            let header = {
                'Content-Type': contentType
            };
            response.writeHead(200, header);
            response.write(file, "binary");
            response.end();
        }catch(error){
            response.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            response.end();
        }
    }else{
        response.writeHead(404, {
            'Content-Type': 'text/html'
        });
        response.write("This request URL " + pathname + " was not found on this server.<br>");
        response.write("you can try <a href = '/cbeta/'>index</a>");
        response.end();
    }


});
server.listen(port);
console.log("Server runing at port: " + port + ".");
