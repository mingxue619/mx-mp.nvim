local M = {}

function M.onCursorMoved()
	local now = vim.fn.localtime(0)
	if
		now - M.last_call > 500 -- ms
	then
		on_cursor_moved()
		last_call = now
	end
end

M.setup_autocmd = function(opt)
	vim.api.nvim_create_autocmd("CursorMoved", {
		pattern = "*",
		callback = function()
			vim.schedule(onCursorMoved)
		end,
		desc = "Throttle cursor move events",
	})
end

return M
