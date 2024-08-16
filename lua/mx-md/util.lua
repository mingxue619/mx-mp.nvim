local job = require("mx-md.job")
local rpc = require("mx-md.rpc")
local autocmd = require("mx-md.autocmd")

local M = {}

function M.getNodeServerStatus()
	local action = "ServerStatus"
	local current_buf = vim.api.nvim_get_current_buf()
	local status = rpc.request(action, current_buf)
	-- vim.notify("status == " .. status)
	-- print("status == " .. status)
	return status
end

function M.perview()
	local job_id = job.start()
	autocmd.setup_autocmd()
	M.openBrowser()
end

function M.openBrowser()
	local timer = vim.loop.new_timer()
	local sleep = 1000
	timer:start(
		1000,
		sleep,
		vim.schedule_wrap(function()
			-- vim.notify("new_timer")
			local nodeServerStatus = M.getNodeServerStatus()
			if not nodeServerStatus then
				return
			end
			local action = "OpenBrowser"
			local current_buf = vim.api.nvim_get_current_buf()
			rpc.request(action, current_buf)
			timer:close()
		end)
	)
end

return M
