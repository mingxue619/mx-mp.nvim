import { WebSocketServer, WebSocket } from "ws";

export default class PageWebSocket {
    constructor(httpServer) {
        this.wss = new WebSocketServer({ server: httpServer });
    }
    setupListeners(mdn) {
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

    broadcastByBufferId(bufferId, data) {
        debugger
        this.wss.clients.forEach((client) => {
            debugger
            if (client.readyState === WebSocket.OPEN) {
                let message = JSON.stringify(data);
                client.send(message);
            }
        });
    }
}
