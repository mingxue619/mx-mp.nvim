local M = {}
function M.getChannelId()
	local success, mxmd_node_channel_id = pcall(vim.api.nvim_get_var, "mxmd_node_channel_id")
	if not success then
		return nil
	end
	return mxmd_node_channel_id
end

function M.notify(action, bufnr)
	local mxmd_node_channel_id = M.getChannelId()
	if not mxmd_node_channel_id then
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
	local mxmd_node_channel_id = M.getChannelId()
	if not mxmd_node_channel_id then
		return
	end
	if mxmd_node_channel_id then
		-- print("request channel id:", mxmd_node_channel_id)
		local result = vim.rpcrequest(mxmd_node_channel_id, action, bufnr)
		if not result then
			return
		end
		if type(result) == "userdata" then
            return
        end
		-- vim.notify("result == " .. result)
		return result
	else
		print("Variable not found")
		return
	end
end

return M
