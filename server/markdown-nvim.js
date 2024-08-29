import * as child_process from "node:child_process";
import { attach, findNvim } from "neovim";
import Browser from "./browser.js";
import MarkdownRender from "./markdown-render.js";

export default class MarkdownNvim {
    constructor(servername) {
        if (servername) {
            this.connection = attach({
                socket: servername,
            });
            // this.connection.command("vsp");
            this.render = new MarkdownRender();
        } else {
            const found = findNvim({ orderBy: "desc", minVersion: "0.9.0" });
            const nvim_proc = child_process.spawn(found.matches[0].path, ["--clean", "--embed"], {});
            this.connection = attach({ proc: nvim_proc });
        }
        this.connection.channelId
            .then(async (channelId) => {
                console.log("channelId: " + channelId);
                await this.connection.setVar("mxmp_node_channel_id", channelId);
            })
            .catch((e) => {
                console.log("error channelId: ", e);
            });
    }

    async setupListeners(ws) {
        this.connection.on("request", async (action, args, resp) => {
            if (!action) {
                return;
            }
            let bufferId = args[0];
            if (!bufferId || bufferId <= 0) {
                return;
            }
            const serverAction = ["ServerStatus"];
            const browserAction = ["OpenBrowser"];
            if (serverAction.includes(action)) {
                resp.send(1);
                return;
            } else if (browserAction.includes(action)) {
                let port = await this.getPort();
                let browser = await this.connection.getVar("mxmp_browser");
                browser = browser || "xdg-open";
                let url = `http://localhost:${port}/page/${bufferId}`;
                // const url = `http://${openHost}:${port}/page/${bufnr}`
                Browser.open(browser, url);
            }
            resp.send();
        });
        this.connection.on("notification", async (action, args) => {
            if (!action) {
                return;
            }
            let bufferId = args[0];
            if (!bufferId || bufferId <= 0) {
                return;
            }
            let info = {};
            let cursorAction = ["CursorMoved", "CursorMovedI"];
            let contentAction = ["CursorHold", "BufWrite", "InsertLeave"];
            if (cursorAction.includes(action)) {
                info = await this.getCursorInfo(bufferId);
            } else if (contentAction.includes(action)) {
                info = await this.getHtmlInfo(bufferId);
            }
            if (!info) {
                info = {};
            }
            info.action = action;
            ws.broadcast(info);
        });
        await this.connection.setVar("mxmp_node_server_status", 1);
    }
    async getPort() {
        try {
            const port = await this.connection.executeLua("return require('mx-mp.service').getPort()");
            if (port) {
                return port;
            }
        } catch (e) {
            console.log(e);
        }
        return 1070;
    }
    // echo bufnr('%')
    async getBufferById(bufnr) {
        const buffers = await this.connection.buffers;
        // const content = await this.getLines();
        let buffer = buffers.find((buffer) => buffer.id === Number(bufnr));
        return buffer;
    }
    async getCursorInfo(bufnr) {
        let buffer = await this.getBufferById(bufnr);
        if (!buffer) {
            return;
        }
        // https://neovim.io/doc/user/builtin.html#winline()
        const winline = await this.connection.call("winline");
        const currentWindow = await this.connection.window;
        const winheight = await this.connection.call("winheight", currentWindow.id);
        const cursor = await this.connection.call("getpos", ".");
        const pageTitle = await this.connection.getVar("mkdp_page_title");
        const name = await buffer.name;
        const currentBuffer = await this.connection.buffer;
        let bufferInfo = {
            type: "cursor",
            bufferId: buffer.id,
            currentBufferId: currentBuffer.id,
            winline,
            winheight,
            cursor,
            pageTitle,
            name,
        };
        return bufferInfo;
    }
    async getBufferInfo(bufnr) {
        let buffer = await this.getBufferById(bufnr);
        if (!buffer) {
            return;
        }
        // https://neovim.io/doc/user/builtin.html#winline()
        const winline = await this.connection.call("winline");
        const currentWindow = await this.connection.window;
        const winheight = await this.connection.call("winheight", currentWindow.id);
        const cursor = await this.connection.call("getpos", ".");
        const pageTitle = await this.connection.getVar("mkdp_page_title");
        const name = await buffer.name;
        // const lines = await buffer.lines;
        const lines = await buffer.getLines();
        const currentBuffer = await this.connection.buffer;
        const bufferInfo = {
            type: "markdown",
            bufferId: buffer.id,
            currentBufferId: currentBuffer.id,
            winline,
            winheight,
            cursor,
            pageTitle,
            name,
            lines,
        };
        return bufferInfo;
    }
    async getHtmlInfo(bufnr) {
        let bufferInfo = await this.getBufferInfo(bufnr);
        const htmlInfo = this.render.renderMarkdown(bufferInfo);
        htmlInfo.type = "html";
        return htmlInfo;
    }
}
