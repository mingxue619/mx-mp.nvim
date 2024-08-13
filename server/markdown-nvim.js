import * as child_process from "node:child_process";
import { attach, findNvim } from "neovim";

export default class MarkdownNvim {
    constructor(servername) {
        debugger;
        if (servername) {
            this.connection = attach({
                socket: servername,
            });
            // this.connection.command("vsp");
        } else {
            const found = findNvim({ orderBy: "desc", minVersion: "0.9.0" });
            const nvim_proc = child_process.spawn(found.matches[0].path, ["--clean", "--embed"], {});
            this.connection = attach({ proc: nvim_proc });
        }
    }

    setupListeners(ws) {
        this.connection.on("request", (method, args, resp) => {
            resp.send();
        });
        this.connection.on("notification", (method, args, resp) => {
            resp.send();
        });
    }
    async getBufferLines(bufnr) {
        debugger;
        const buffers = await plugin.nvim.buffers;
        // const content = await this.getLines();
        buffers.forEach(async (buffer) => {
            if (buffer.id === Number(bufnr)) {
                const winline = await this.connection.call("winline");
                const currentWindow = await this.connection.window;
                const winheight = await this.connection.call("winheight", currentWindow.id);
                const cursor = await this.connection.call("getpos", ".");
                const options = await this.connection.getVar("mkdp_preview_options");
                const pageTitle = await this.connection.getVar("mkdp_page_title");
                const theme = await this.connection.getVar("mkdp_theme");
                const name = await buffer.name;
                const content = await buffer.getLines();
                const currentBuffer = await this.connection.buffer;
                // client.emit("refresh_content", {
                //     options,
                //     isActive: currentBuffer.id === buffer.id,
                //     winline,
                //     winheight,
                //     cursor,
                //     pageTitle,
                //     theme,
                //     name,
                //     content,
                // });
            }
        });
    }
}
