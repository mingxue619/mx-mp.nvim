import * as child_process from 'node:child_process'
import * as assert from 'node:assert'
import { attach, findNvim } from 'neovim'

// Find `nvim` on the system and open a channel to it.
(async function() {
  const found = findNvim({ orderBy: 'desc', minVersion: '0.9.0' })
  console.log(found);
  const nvim_proc = child_process.spawn(found.matches[0].path, ['--clean', '--embed'], {});
  const nvim = attach({ proc: nvim_proc });

  nvim.command('vsp | vsp | vsp');

  const windows = await nvim.windows;
  assert.deepStrictEqual(windows.length, 4);
  assert.ok(windows[0] instanceof nvim.Window);

  nvim.window = windows[2];
  const win = await nvim.window;
  assert.ok(win.id !== windows[0].id);
  assert.deepStrictEqual(win.id, windows[2].id);

  const buf = await nvim.buffer;
  assert.ok(buf instanceof nvim.Buffer);
  const lines = await buf.lines;
  assert.deepStrictEqual(lines, []);

  await buf.replace(['line1', 'line2'], 0);
  const newLines = await buf.lines;
  assert.deepStrictEqual(newLines, ['line1', 'line2']);

  if (nvim_proc.disconnect) {
    nvim_proc.disconnect();
  }
  nvim.quit();
  while (nvim_proc.exitCode === null) {
    await new Promise(resolve => setTimeout(resolve, 100))
    console.log('waiting for Nvim (pid %d) to exit', nvim_proc.pid);
  }
  console.log('Nvim exit code: %d', nvim_proc.exitCode);
})();
