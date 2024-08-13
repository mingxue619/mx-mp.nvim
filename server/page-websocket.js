// import { WebSocketServer, WebSocket } from "ws";
import { Server } from "socket.io";

export default class PageWebSocket {
    constructor(httpServer) {
        this.io = new Server(httpServer, {});
        // this.wss = new WebSocketServer({ server: httpServer });
    }

    setupListeners(mdn) {
        this.io.on("connection", async (client) => {
            debugger
            console.log("a user connected");
            client.on("init", (msg) => {
                debugger
                console.log("ws init received: " + msg);
                const data = JSON.parse(msg);
                let bufnr = data.bufnr;
                // let content = mdn.getBufferLines(bufnr);
                client.emit("refresh-content", msg);
            });
            client.on("disconnect", () => {
                console.log("user disconnected");
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
