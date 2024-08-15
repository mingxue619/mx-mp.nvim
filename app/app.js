let markdown = new Markdown;
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
    const ws = new WebSocket("ws://" + host + "/md");
    ws.onopen = function () {
        console.log("Connected to the server");
        const data = {
            action: "Init",
            bufnr: bufnr,
        };
        let msg = JSON.stringify(data);
        ws.send(msg);
    };

    ws.onmessage = function (event) {
        debugger
        console.log(`Received from server: ${event.data}`);
        let data = event.data;
        let bufferInfo = JSON.parse(data);
        let action = bufferInfo.action;
        let cursorAction = ["CursorMoved", "CursorMovedI"];
        let contentAction = ["Init", "CursorHold", "BufWrite", "InsertLeave"];
        if (cursorAction.includes(action)) {
        } else if (contentAction.includes(action)) {
            let success = markdown.renderMarkdown(bufferInfo);
            if(!success) {
                return;
            }
            scrollPage(bufferInfo);
        }
    };

    ws.onclose = function () {
        console.log("Disconnected from the server");
    };
}

// function wsConnect(bufnr) {
//     // const host = window.location.host;
//     // const ws = new WebSocket("ws://" + host);
//     const socket = io();
//     socket.on("connect", function () {
//         debugger
//         console.log("Connected to server");
//         const data = {
//             bufnr: bufnr,
//         };
//         let msg = JSON.stringify(data);
//         socket.emit("init", msg);
//     });
//
//     socket.on("refresh-content", function (msg) {
//         debugger
//         console.log("received message: " + msg);
//     });
// }
