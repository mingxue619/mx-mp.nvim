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
                console.log("ws message received: %s", msg);
                const data = JSON.parse(msg);
                let action = data.action;
                if (action === "Init") {
                    let bufnr = data.bufnr;
                    let info = await mdn.getHtmlInfo(bufnr);
                    info.action = action;
                    let infoStr = JSON.stringify(info);
                    ws.send(infoStr);
                }
            });

            ws.on("close", async () => {
                console.log("WebSocket connection closed.");
            });
        });
    }

    broadcast(data) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                let message = JSON.stringify(data);
                client.send(message);
            }
        });
    }
}
