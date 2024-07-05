const neovim = require("@chemzqm/neovim");

const plugin = neovim.attach({
    reader: process.stdin,
    writer: process.stdout,
});
const buffers = await plugin.nvim.buffers;
buffers.forEach(async (buffer) => {
    console.log(buffer.id)
});
