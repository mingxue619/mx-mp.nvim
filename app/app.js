let bufnr = getBufferNumber();
if (bufnr) {
    wsConnect(bufnr);
}

function getBufferNumber() {
    const pathname = window.location.pathname;
    const match = pathname.match(/\/page\/(\d+)/);
    if (match && match[1]) {
        const bufnr = match[1];
        return bufnr;
    } else {
        alert("url is error");
    }
}

function wsConnect(bufnr) {
    // const host = window.location.host;
    // const ws = new WebSocket("ws://" + host);
    const socket = io();
    socket.on("connect", function () {
        console.log("Connected to server");
        const data = {
            bufnr: bufnr,
        };
        let message = JSON.stringify(data);
        socket.emit("init", message);
    });

    socket.on("refresh-content", function (msg) {
        debugger
        console.log("received message: " + msg);
    });
}
