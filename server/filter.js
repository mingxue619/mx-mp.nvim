const http = require('http');
const url=require('url');
const path=require('path');
const menu = require('./menu');
let httpFilter = function(request, response){
    let pathname = url.parse(request.url).pathname;
    if(pathname.startsWith('/menu/')) {
        let code = decodeURI(pathname).split('/')[2];
        // check menu param
        let security = true;
        if (code != 'cbeta') {
            let codeList = code.split('-');
            codeList.forEach(function(item){
                if (!item.match(/^\d{4}$/)) {
                    security = false;
                }
            });
        }
        if (security) {
            menu.find(code,(result) => {
                let elements = [];
                if (result && result[0] && result[0].elements) {
                    elements = result[0].elements;
                }
                response.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                response.write(JSON.stringify(elements));
                response.end();
            });
        }else {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            response.write(JSON.stringify([]));
            response.end();
        }
        return false;
    }
    return pathname;
}
let pathNameFilter = function(pathname){
    let real_path = 'app/app.html';
    let urls = pathname.split('/');
    if(urls[1]){
        if(urls[1] == 'app'){
            urls.shift();
            real_path = urls.join('/');
        }else if(urls[1] == 'node_modules'){
            urls.shift();
            real_path = urls.join('/');
        }else if(urls[1] == 'epub'){
            urls.shift();
            real_path = urls.join('/');
        }else if(urls[1] == 'cbeta'){
            real_path = 'app/app.html'
        }else{
            real_path = 'app' + pathname;
        }
    }
    return real_path;
}
exports.httpFilter = httpFilter;
exports.pathNameFilter = pathNameFilter;
