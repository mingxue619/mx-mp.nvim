local job = require("mx-md.job")
local rpc = require("mx-md.rpc")
local autocmd = require("mx-md.autocmd")

local M = {}

function M.getNodeServerStatus()
	local success, mxmd_node_server_status = pcall(vim.api.nvim_get_var, "mxmd_node_server_status")
	if not success then
		return nil
	end
    return mxmd_node_server_status
end

function M.perview()
	local job_id = job.start()
	local mxmd_node_server_status = vim.fn.timer_start(1000, M.getNodeServerStatus())
    if not mxmd_node_server_status then
	    mxmd_node_server_status = vim.fn.timer_start(1000, M.getNodeServerStatus())
    end
    if not mxmd_node_server_status then
        print("server start failed")
        return
    end
	autocmd.setup_autocmd()
	M.openBrowser()
end

function M.openBrowser()
	local action = "OpenBrowser"
	local current_buf = vim.api.nvim_get_current_buf()
	rpc.request(action, current_buf)
end

return M
