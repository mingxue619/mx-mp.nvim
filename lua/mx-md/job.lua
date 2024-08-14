local autocmd = require("mx-md.autocmd")

local M = {}

function M.preview()
	vim.g.mxmd_preview_bufnr = vim.api.nvim_get_current_buf()
	local servername = vim.v.servername
	-- lua print(servername)
	-- local pid = vim.fn.getpid()
	local script_path = debug.getinfo(1, "S").source:sub(2)
	-- local script_path = vim.fn.expand("<sfile>:p")
	local project_dir = script_path:match("(.*/).-/"):match("(.*/).-/")
	-- local cmd = "ALLOW_CONSOLE=1 node " .. project_dir .. "server/server.js " .. servername .. " > /tmp/mxmd-log.txt"
	local cmd = "cd "
		.. project_dir
		.. " && ALLOW_CONSOLE=1  node --inspect server/server.js "
		.. servername
		.. " > ./mxmd.log"

	-- local cmd = "cd " .. project_dir .. " && ALLOW_CONSOLE=1  node --inspect-brk server/server.js " .. servername
	print("cmd: " .. cmd)
	-- local job_id = vim.fn.jobstart({ "node", project_dir .. "server.mjs", ">> /tmp/nlog.txt" }, {
	M.job_id = vim.fn.jobstart(cmd, {
		rpc = true,
		on_stdout = function(id, data, name)
			print("stdout: " .. table.concat(data, "\n"))
		end,
		on_stderr = function(id, data, name)
            -- vim.g.mxmd_preview_bufnr = nil
			print("stderr: " .. table.concat(data, "\n"))
		end,
		on_exit = function(id, code, event)
            vim.g.mxmd_preview_bufnr = nil
			print("Node process exited with code " .. code)
		end,
	})
    autocmd.setup_autocmd()
	-- vim.rpcnotify(job_id, "send_message", "Hello from Neovim!")
	-- vim.rpcnotify(3, "send_message", "Hello from Neovim!")
	-- rpcrequest(job_id, 'nvim_eval', '"Hello " . "world!"')
	-- rpcrequest(job_id, "nvim_eval")
	-- print("job_id=" .. M.job_id)
	-- local response vim.rpcrequest(job_id, 'nvim_eval', '"Hello " . "world!"')
end

return M
