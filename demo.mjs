import * as child_process from "node:child_process";
import * as assert from "node:assert";
import { attach, findNvim } from "neovim";
import { Socket } from "net";
import { createConnection } from "node:net";

import fs from "fs";


// Find `nvim` on the system and open a channel to it.
(async function () {
    let socket = "/run/user/1000/nvim.2234070.0";
    const nvim = attach({
        socket: socket,
    });
    nvim.command("vsp");
    // fs.writeFileSync(filePath, "l6");
    const windows = await nvim.windows;
    console.log(windows.length);
})();
