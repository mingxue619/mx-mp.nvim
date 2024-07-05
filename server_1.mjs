import http from "http";

const PORT = 3000;

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, world!\n");
});

// 监听端口
server.listen(PORT, () => {
    const found = findNvim({ orderBy: "desc", minVersion: "0.9.0" });
    console.log(found);
    console.log(`Server is running on http://localhost:${PORT}`);
});
