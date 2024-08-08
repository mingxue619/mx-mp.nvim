import * as child_process from "node:child_process";
import * as assert from "node:assert";
import { attach, findNvim } from "neovim";
import { Socket } from "net";
import { createConnection } from "node:net";

import fs from "fs";
const filePath = "/home/ad/github/mingxue619/mx-md.nvim/log"

const servername = process.argv[2];


// Find `nvim` on the system and open a channel to it.
(async function () {
    fs.writeFileSync(filePath, "l1");
    // let servername = "/run/user/1000/nvim.2234070.0";

    const nvim = attach({
        socket: servername,
    });
    // nvim.command("vsp");
    const windows = await nvim.windows;
    console.log(windows.length);
    nvim.on("request", (method, args, resp) => {
        // console.log(method);
        fs.writeFileSync(filePath, method);
        // if (method === 'send_message') {
        // }
        resp.send();
    });
    nvim.on("notification", (method, args, resp) => {
        // console.log(method);
        fs.writeFileSync(filePath, method);
        // if (method === 'send_message') {
        // }
        resp.send();
    });
    let channelId = await nvim.channelId;
    await nvim.setVar('mxmd_node_channel_id', channelId)

})();
