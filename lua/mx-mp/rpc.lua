local M = {}
function M.getChannelId()
	local success, mxmp_node_channel_id = pcall(vim.api.nvim_get_var, "mxmp_node_channel_id")
	if not success then
		return nil
	end
	return mxmp_node_channel_id
end

function M.notify(action, bufnr)
	local mxmp_node_channel_id = M.getChannelId()
	if not mxmp_node_channel_id then
		return
	end
	if mxmp_node_channel_id then
		-- print("notify channel id:", mxmp_node_channel_id, ", action = ", action)
		vim.rpcnotify(mxmp_node_channel_id, action, bufnr)
	else
		print("Variable not found")
	end
end
function M.request(action, bufnr)
	-- print("request")
	-- print("OpenBrowser.....", action, "---", current_buf)
	local mxmp_node_channel_id = M.getChannelId()
	if not mxmp_node_channel_id then
		return
	end
	if mxmp_node_channel_id then
		-- print("request channel id:", mxmp_node_channel_id)
		local result = vim.rpcrequest(mxmp_node_channel_id, action, bufnr)
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
