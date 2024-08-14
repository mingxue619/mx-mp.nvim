local rpc = require("mx-md.rpc")
local M = {}
M.last_call = 0

function M.isPreviewBuffer()
	local success, mxmd_node_channel_id = pcall(vim.api.nvim_get_var, "mxmd_preview_bufnr")
	if not success then
		return false
	end
	local current_buf = vim.api.nvim_get_current_buf()
	return current_buf == mxmd_node_channel_id
end
function M.timeAllow()
	local now = vim.loop.hrtime()
	if now - M.last_call > 500e6 then -- nano/1e6 == ms
		M.last_call = now
		return true
	end
	return false
end

M.setup_autocmd = function(opt)
	vim.api.nvim_create_autocmd("CursorMoved", {
		pattern = "*",
		callback = function()
			vim.schedule(function()
				if not M.isPreviewBuffer() then
					return
				end
				if not M.timeAllow() then
					return
				end
	            local current_buf = vim.api.nvim_get_current_buf()
				rpc.notify("CursorMoved", current_buf)
			end)
		end,
		desc = "Throttle cursor move events",
	})
end

return M
