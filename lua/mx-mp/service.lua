local job = require("mx-mp.job")
local rpc = require("mx-mp.rpc")
local autocmd = require("mx-md.autocmd")

local M = {}

-- function M.register()
--     vim.cmd([[
--         function! mxmp#service#get_port()
--             return luaeval("return require('mx-mp.service').getPort()")
--         endfunction
--     ]]);
-- end

function M.getPort()
    return 1070;
end

return M
