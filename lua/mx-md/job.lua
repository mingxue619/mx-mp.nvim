local M = {}

function M.start()
	vim.g.mxmd_preview_bufnr = vim.api.nvim_get_current_buf()
	local servername = vim.v.servername
	-- lua print(servername)
	-- local pid = vim.fn.getpid()
	local script_path = debug.getinfo(1, "S").source:sub(2)
	-- local script_path = vim.fn.expand("<sfile>:p")
	local project_dir = script_path:match("(.*/).-/"):match("(.*/).-/")
	local cmd = "cd "
		.. project_dir
		.. " && ALLOW_CONSOLE=1  node --inspect server/server.js "
		.. servername
		.. " > ./mxmd.log"
	-- local cmd = "cd "
	-- 	.. project_dir
	-- 	.. " && ALLOW_CONSOLE=1  node --inspect-brk server/server.js "
	-- 	.. servername
	-- 	.. " > ./mxmd.log"
	-- print("cmd: " .. cmd)
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
end

return M
