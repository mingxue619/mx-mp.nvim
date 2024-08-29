local rpc = require("mx-mp.rpc")
local M = {}
M.last_call = 0

-- function M.debounce(ms, fn)
-- 	local timer = vim.loop.new_timer()
-- 	return function(...)
-- 		local argv = { ... }
-- 		timer:start(ms, 0, function()
-- 			timer:stop()
-- 			vim.schedule_wrap(fn)(unpack(argv))
-- 		end)
-- 	end
-- end

function M.isPreviewBuffer()
	local success, mxmp_node_channel_id = pcall(vim.api.nvim_get_var, "mxmp_preview_bufnr")
	if not success then
		return false
	end
	local current_buf = vim.api.nvim_get_current_buf()
	return current_buf == mxmp_node_channel_id
end

function M.cursorTimeAllow()
	local now = vim.loop.hrtime()
	if now - M.last_call > 500e6 then -- nano/1e6 == ms
		M.last_call = now
		return true
	end
	return false
end

function M.contentTimeAllow()
	local now = vim.loop.hrtime()
	if now - M.last_call > 100e6 then -- nano/1e6 == ms
		M.last_call = now
		return true
	end
	return false
end

function M.onCursorMoved(action)
	-- print("onCursorMoved, action = :", action)
	if not M.isPreviewBuffer() then
		return
	end
	-- if not M.cursorTimeAllow() then
	-- 	return
	-- end
	local current_buf = vim.api.nvim_get_current_buf()
	rpc.notify(action, current_buf)
end

function M.onContentRefresh(action)
	-- print("onContentRefresh, action = :", action)
	if not M.isPreviewBuffer() then
		return
	end
	-- if not M.contentTimeAllow() then
	-- 	return
	-- end
	local current_buf = vim.api.nvim_get_current_buf()
	rpc.notify(action, current_buf)
end

M.setup_autocmd = function(opt)
	-- slow CursorHold,BufWrite,InsertLeave
	-- quick CursorHold,CursorHoldI,CursorMoved,CursorMovedI
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
	-- local contentRefreshActionArray = { "CursorHold", "CursorHoldI", "BufWrite", "InsertLeave" }
	local contentRefreshActionArray = { "CursorHold", "BufWrite", "InsertLeave" }
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
