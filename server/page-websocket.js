// import { WebSocketServer, WebSocket } from "ws";
import { Server } from "socket.io";

export default class PageWebSocket {
    constructor(httpServer) {
        this.io = new Server(httpServer, {});
        // this.wss = new WebSocketServer({ server: httpServer });
    }

    setupListeners(nvim) {
        this.io.on("connection", async (client) => {
            debugger;
            console.log("a user connected");
            client.on("init", (msg) => {
                console.log("message: " + msg);
                client.emit("refresh-content", msg);
            });
            client.on("disconnect", () => {
                // console.log("user disconnected");
                // const data = JSON.parse(message);
                // console.log("ws received:", data);
                // ws.send(`Echo: ${message}`);
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
