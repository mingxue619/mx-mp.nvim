local job = require("mx-md.job")
local rpc = require("mx-md.rpc")
local autocmd = require("mx-md.autocmd")

local M = {}


function M.perview()
    job.start();
	autocmd.setup_autocmd()
    -- M.openBrowser();
end

function M.openBrowser()
    local action = "OpenBrowser"
	local current_buf = vim.api.nvim_get_current_buf()
	rpc.request(action, current_buf)
end

return M
