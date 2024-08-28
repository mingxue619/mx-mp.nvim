local job = require("mx-mp.job")
local rpc = require("mx-mp.rpc")
local autocmd = require("mx-mp.autocmd")

local M = {}

-- function M.register()
--     vim.cmd([[
--         function! mxmp#service#get_port()
--             return luaeval("return require('mx-mp.service').getPort()")
--         endfunction
--     ]]);
-- end

-- lua print(require('mx-mp.service').getPort()) 
function M.getPort()
	local success, mxmp_port = pcall(vim.api.nvim_get_var, "mxmp_port")
	if success then
        if mxmp_port then
		    return mxmp_port
        end
	end
    return 1070;
end

return M
