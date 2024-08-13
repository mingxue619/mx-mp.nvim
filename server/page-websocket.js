import { WebSocketServer, WebSocket} from "ws";

export default class PageWebSocket {
    constructor(httpServer) {
        this.wss = new WebSocketServer({ server: httpServer });
    }

    setupListeners(nvim) {
        this.wss.on("connection", (ws) => {
            console.log("A WebSocket connection has been established.");

            ws.on("message", (message) => {
                console.log(`Received: ${message}`);
                ws.send(`Echo: ${message}`);
            });

            ws.on("close", () => {
                console.log("WebSocket connection closed.");
            });

            ws.on("error", (err) => {
                console.error("WebSocket error:", err);
            });
        });
    }

    broadcast(message) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
}
