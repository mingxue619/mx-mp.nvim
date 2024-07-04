local M = {}

function M.build(cfg)
     print("mxmd build!")
end
function M.setup(cfg)
end

vim.cmd('command! MXMDBuild lua require("mx-md").build()')

return M
  
