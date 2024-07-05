import * as child_process from "node:child_process";
import * as assert from "node:assert";
import { attach, findNvim } from "neovim";

// Find `nvim` on the system and open a channel to it.
(async function () {
    const found = findNvim({ orderBy: "desc", minVersion: "0.9.0" });
    // console.log(found);
    const nvim_proc = child_process.spawn(found.matches[0].path, ["--clean", "--embed"], {});
    // console.log(nvim_proc);
    const nvim = attach({ proc: nvim_proc });
    // nvim.command("vsp | vsp | vsp");
    const buffer = await nvim.buffer;
    const windows = await nvim.windows;
    const name = await buffer.name
    console.log("================" + buffer);

    // nvim.command('vsp | vsp | vsp');
    // console.log("Connected to Neovim version:", version);
})();
