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
    debugger
    const socket = io();
    socket.on("connect", function () {
        debugger
        console.log("Connected to server");
        const data = {
            bufnr: bufnr,
        };
        let msg = JSON.stringify(data);
        socket.emit("init", msg);
    });

    socket.on("refresh-content", function (msg) {
        debugger
        console.log("received message: " + msg);
    });
}
