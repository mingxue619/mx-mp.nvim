local M = {}

function M.notify(action, bufnr)
	local success, mxmd_node_channel_id = pcall(vim.api.nvim_get_var, "mxmd_node_channel_id")
	if not success then
		return
	end
	if mxmd_node_channel_id then
		-- print("notify channel id:", mxmd_node_channel_id)
		vim.rpcnotify(mxmd_node_channel_id, action, bufnr)
	else
		print("Variable not found")
	end
end
function M.request(action, bufnr)
	-- print("request")
	-- print("OpenBrowser.....", action, "---", current_buf)
	local success, mxmd_node_channel_id = pcall(vim.api.nvim_get_var, "mxmd_node_channel_id")
	if not success then
		return
	end
	if mxmd_node_channel_id then
		-- print("request channel id:", mxmd_node_channel_id)
		vim.rpcrequest(mxmd_node_channel_id, action, bufnr)
	else
		print("Variable not found")
	end
end

return M
