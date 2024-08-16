local util = require("mx-md.util");
local M = {}

-- function M.build(cfg)
--      print("mxmd build!")
-- end
-- function M.setup(cfg)
-- end
--
-- vim.cmd('command! MXMDBuild lua require("mx-md").build()')

M.setup = function(opt)
	vim.api.nvim_create_user_command("MXMDPreview", function(res)
        util.perview();
	end, {})
	vim.api.nvim_create_user_command("MXMDOpenBrowser", function(res)
        util.openBrowser();
	end, {})
end

return M
  
