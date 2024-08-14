import { WebSocketServer, WebSocket } from "ws";
// import { Server } from "socket.io";

export default class PageWebSocket {
    constructor(httpServer) {
        // this.io = new Server(httpServer, {});
        this.wss = new WebSocketServer({ server: httpServer });
    }
    setupListeners(mdn) {
        // this.wss.on("connection", function connection(ws) {
        //     ws.on("error", console.error);
        //
        //     ws.on("message", function message(msg) {
        //         debugger
        //         // console.log("received: %s", msg);
        //         const data = JSON.parse(msg);
        //         let bufnr = data.bufnr;
        //         // let content = await mdn.getBufferLines(bufnr);
        //         // ws.send(`Echo: ${content}`);
        //         ws.send(`Echo: ${msg}`);
        //     });
        //
        // });
        this.wss.on("connection", async (ws) => {
            console.log("A WebSocket connection has been established.");
            ws.on("error", async (err) => {
                console.error("WebSocket error:", err);
            });
            ws.on("message", async (msg) => {
                debugger;
                console.log("ws message received: %s", msg);
                const data = JSON.parse(msg);
                let action = data.action;
                if (action === "init") {
                    let bufnr = data.bufnr;
                    let bufferInfo = await mdn.getBufferInfo(bufnr);
                    bufferInfo.action = action;
                    let bufferInfoStr = JSON.stringify(bufferInfo);
                    ws.send(bufferInfoStr);
                }
            });

            ws.on("close", async () => {
                console.log("WebSocket connection closed.");
            });
        });
    }

    // setupListeners(mdn) {
    //     this.io.on("connection", async (client) => {
    //         debugger
    //         console.log("a user connected");
    //         client.on("init", (msg) => {
    //             debugger
    //             console.log("ws init received: " + msg);
    //             const data = JSON.parse(msg);
    //             let bufnr = data.bufnr;
    //             // let content = mdn.getBufferLines(bufnr);
    //             client.emit("refresh-content", msg);
    //         });
    //         client.on("disconnect", () => {
    //             console.log("user disconnected");
    //         });
    //     });
    // }

    // broadcast(message) {
    //     this.wss.clients.forEach((client) => {
    //         if (client.readyState === WebSocket.OPEN) {
    //             client.send(message);
    //         }
    //     });
    // }
}
