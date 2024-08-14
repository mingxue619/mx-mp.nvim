import * as child_process from "node:child_process";
import { attach, findNvim } from "neovim";

export default class MarkdownNvim {
    constructor(servername) {
        debugger;
        if (servername) {
            this.connection = attach({
                socket: servername,
            });
            debugger;
            // this.connection.command("vsp");
        } else {
            const found = findNvim({ orderBy: "desc", minVersion: "0.9.0" });
            const nvim_proc = child_process.spawn(found.matches[0].path, ["--clean", "--embed"], {});
            this.connection = attach({ proc: nvim_proc });
        }
        this.connection.channelId
            .then(async (channelId) => {
                console.log("channelId: " + channelId);
                await this.connection.setVar("mxmd_node_channel_id", channelId);
            })
            .catch((e) => {
                console.log("error channelId: ", e);
            });
        // let channelId = this.connection.channelId
        // console.log("channelId: ", channelId);
        // .then(async (channelId) => {
        //     console.log("channelId: ", channelId);
        //     await this.connection.setVar("mxmd_node_channel_id", channelId);
        // })
        // .catch((e) => {
        //     console.log("error channelId: ", e);
        // });
    }

    setupListeners(ws) {
        this.connection.on("request", (action, args, resp) => {
            resp.send();
        });
        this.connection.on("notification", (action, args, resp) => {
            resp.send();
        });
    }
    async getBufferInfo(bufnr) {
        const buffers = await this.connection.buffers;
        // const content = await this.getLines();
        let buffer = buffers.find((buffer) => buffer.id === Number(bufnr));
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
        const content = await buffer.getLines();
        const currentBuffer = await this.connection.buffer;
        const bufferInfo = {
            id: buffer.id,
            currentId: currentBuffer.id,
            winline,
            winheight,
            cursor,
            pageTitle,
            name,
            content,
        };
        return bufferInfo;
    }
}
