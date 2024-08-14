local M = {}

function M.notify(action, bufnr)
	local success, mxmd_node_channel_id = pcall(vim.api.nvim_get_var, "mxmd_node_channel_id")
    if not success then
        return
    end
	if mxmd_node_channel_id then
		print("Channel ID:", mxmd_node_channel_id)
		vim.rpcnotify(mxmd_node_channel_id, action, bufnr)
	else
		print("Variable not found")
	end
end
function M.request()
	-- local success, mxmd_node_channel_id = pcall(vim.api.nvim_get_var, "mxmd_node_channel_id")
 --    print(success)
 --    if not success then
 --        return
 --    end
	-- local mxmd_node_channel_id = vim.api.nvim_get_var("mxmd_node_channel_id")
	-- if mxmd_node_channel_id then
	-- 	print("Channel ID:", mxmd_node_channel_id)
	-- 	vim.rpcrequest(mxmd_node_channel_id, "send_message", "Hello from Neovim!")
	-- else
	-- 	print("Variable not found")
	-- end
end

return M
