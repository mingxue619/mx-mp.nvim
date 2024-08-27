local util = require("mx-mp.util")
local M = {}

M.setupOption = function(opt)
	local browser = opt.browser
	vim.g.mxmp_browser = browser
end
M.setupCommand = function(opt)
	vim.api.nvim_create_user_command("MXMPPreview", function(res)
		util.perview()
	end, {})
	vim.api.nvim_create_user_command("MXMPOpenBrowser", function(res)
		util.openBrowser()
	end, {})
	vim.api.nvim_create_user_command("MXMPRestart", function(res)
		util.restart()
	end, {})
end
M.setup = function(opt)
	M.setupOption(opt)
	M.setupCommand(opt)
end

return M
