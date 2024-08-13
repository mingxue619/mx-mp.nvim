import * as child_process from "node:child_process";
import * as assert from "node:assert";
import { attach, findNvim } from "neovim";

// ALLOW_CONSOLE=1 node server/nvim-demo.js
(async function () {
    let servername = "/run/user/1000/nvim.2785286.0";
    const nvim = attach({
        socket: servername,
    });

    nvim.command("vsp | vsp | vsp");
})();
