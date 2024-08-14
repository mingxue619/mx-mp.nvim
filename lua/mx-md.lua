local job = require("mx-md.job");
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
        job.preview();
	end, {})
end

return M
  
