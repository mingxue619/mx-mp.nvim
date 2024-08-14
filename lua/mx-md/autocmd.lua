local rpc = require("mx-md.rpc")
local M = {}
M.last_call = 0

function M.isPreviewBuffer()
	local current_buf = vim.api.nvim_get_current_buf()
	local mxmd_node_channel_id = vim.api.nvim_get_var("mxmd_node_channel_id")
	return current_buf == mxmd_node_channel_id
end
function M.timeAllow()
	local now = vim.fn.localtime()
	if now - M.last_call > 500 then -- ms
		M.last_call = now
        return true;
	end
    return false;
end

M.setup_autocmd = function(opt)
	vim.api.nvim_create_autocmd("CursorMoved", {
		pattern = "*",
		callback = function()
			vim.schedule(function()
                local isPreviewBuffer = M.isCurrentBuffer()
                if !isPreviewBuffer then
                    return
                end
                local timeAllow = M.timeAllow()
                if !timeAllow then
                    return
                end
                rpc.notify("CursorMoved", 0)
			end)
		end,
		desc = "Throttle cursor move events",
	})
end

return M
