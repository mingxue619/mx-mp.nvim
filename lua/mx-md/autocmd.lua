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

function M.onCursorMoved(action)
	if not M.isPreviewBuffer() then
		return
	end
	if not M.timeAllow() then
		return
	end
	local current_buf = vim.api.nvim_get_current_buf()
	rpc.notify(action, current_buf)
end

function M.onContentRefresh(action)
	if not M.isPreviewBuffer() then
		return
	end
	local current_buf = vim.api.nvim_get_current_buf()
	rpc.notify(action, current_buf)
end

M.setup_autocmd = function(opt)
	local cursorMoveActionArray = { "CursorMoved", "CursorMovedI" }
	for _, action in ipairs(cursorMoveActionArray) do
		vim.api.nvim_create_autocmd(action, {
			pattern = "*",
			callback = function()
				vim.schedule(function()
					M.onCursorMoved(action)
				end)
			end,
			desc = "Throttle cursor move events",
		})
	end
	local contentRefreshActionArray = { "CursorHold", "CursorHoldI" }
	for _, action in ipairs(contentRefreshActionArray) do
		vim.api.nvim_create_autocmd(action, {
			pattern = "*",
			callback = function()
				vim.schedule(function()
					M.onContentRefresh(action)
				end)
			end,
			desc = "Throttle cursor move events",
		})
	end
end

return M
