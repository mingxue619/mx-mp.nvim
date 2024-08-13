import * as child_process from 'node:child_process'
import { attach, findNvim } from "neovim";

export default class MarkdownNvim {
    constructor(servername) {
        debugger
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
}
