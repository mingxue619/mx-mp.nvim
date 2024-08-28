import PageWebSocket from "./page-websocket.js";
import MarkdownNvim from "./markdown-nvim.js";
import HttpServer from "./http-server.js";

const servername = process.argv[2];

// import { attach } from "neovim";
// let nvim = attach({
//     socket: servername,
// });
// nvim.command("vsp");

const httpServer = HttpServer.createServer();
const pws = new PageWebSocket(httpServer);
const mdn = new MarkdownNvim(servername);
pws.setupListeners(mdn);
mdn.setupListeners(pws);

let port = await mdn.getPort()
httpServer.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
});
