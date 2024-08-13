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
    const host = window.location.host;
    const ws = new WebSocket("ws://" + host);

    ws.onopen = function () {
        console.log("Connected to the server");
        const message = {
            bufnr: bufnr,
        };
        ws.send(message);
    };

    ws.onmessage = function (event) {
        console.log(`Received from server: ${event.data}`);
    };

    ws.onclose = function () {
        console.log("Disconnected from the server");
    };
}
