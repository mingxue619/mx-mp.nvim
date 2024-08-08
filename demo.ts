import { attach, NeovimClient } from "@chemzqm/neovim";
// attach option could be ReadableStream & WritableStream or ChildProcess or socket string
const nvim: NeovimClient = attach({
    reader: process.stdin,
    writer: process.stdout,
});
// current buffer object
let buf = await nvim.buffer;
// current window object
let win = await nvim.window;
// current tabpage object
let tabpage = await nvim.tabpage;
