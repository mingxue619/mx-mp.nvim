import { attach } from "neovim";

export default class Nvim {
    constructor(servername) {
        this.connection = attach({
            socket: servername,
        });
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
