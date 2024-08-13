import PageWebSocket from "./page-websocket.js";
import MarkdownNvim from "./markdown-nvim.js";
import HttpServer from "./http-server.js";

const PORT = 1073;
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

httpServer.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
