import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { runCli } from '../src/cli.js';

test('init creates a usable .vibebreaker workspace', async () => {
  const cwd = await mkdtemp(join(tmpdir(), 'vibebreaker-'));

  try {
    await runCli(['init'], cwd);

    const config = JSON.parse(
      await readFile(join(cwd, '.vibebreaker', 'config.json'), 'utf8')
    );
    const prompt = await readFile(
      join(cwd, '.vibebreaker', 'AGENT_PROMPT.txt'),
      'utf8'
    );

    assert.equal(config.protocol, 'VibeBreaker 20-Pass Protocol');
    assert.equal(config.readOnlyAudit, true);
    assert.match(prompt, /Execute passes 01 through 20 in order/);

    await runCli(['doctor'], cwd);
  } finally {
    await rm(cwd, { recursive: true, force: true });
  }
});
